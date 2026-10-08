import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Safaricom Daraja STK Push (Lipa Na M-Pesa Online)
 * Docs: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
 */
async function getAccessToken() {
  const consumerKey = process.env.DARAJA_CONSUMER_KEY;
  const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
  const env = process.env.DARAJA_ENV || 'sandbox';

  if (!consumerKey || !consumerSecret) {
    throw new Error('Daraja credentials not configured');
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const url =
    env === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Failed to get Daraja access token');
  return data.access_token as string;
}

function generatePassword(shortcode: string, passkey: string, timestamp: string) {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
}

function getTimestamp() {
  const d = new Date();
  return (
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    String(d.getSeconds()).padStart(2, '0')
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, phone, type = 'deposit' } = body;

    if (!amount || !phone) {
      return NextResponse.json({ error: 'Amount and phone required' }, { status: 400 });
    }

    // Normalize phone to 254...
    let msisdn = phone.replace(/\s+/g, '');
    if (msisdn.startsWith('0')) msisdn = '254' + msisdn.slice(1);
    if (msisdn.startsWith('+')) msisdn = msisdn.slice(1);

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const shortcode = process.env.DARAJA_SHORTCODE || '174379';
    const passkey = process.env.DARAJA_PASSKEY || '';
    const callbackUrl =
      process.env.DARAJA_CALLBACK_URL ||
      `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`;
    const env = process.env.DARAJA_ENV || 'sandbox';

    // If credentials missing, create a simulated pending payment for demo
    if (!process.env.DARAJA_CONSUMER_KEY || !passkey) {
      const { data: payment, error } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: Number(amount),
          type,
          method: 'mpesa',
          status: 'pending',
          phone: msisdn,
          reference: `SIM-${Date.now()}`,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: 'Demo mode: payment created as pending. Configure Daraja keys for live STK.',
        CheckoutRequestID: payment.id,
        demo: true,
      });
    }

    const token = await getAccessToken();
    const timestamp = getTimestamp();
    const password = generatePassword(shortcode, passkey, timestamp);

    const stkUrl =
      env === 'production'
        ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const stkRes = await fetch(stkUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(Number(amount)),
        PartyA: msisdn,
        PartyB: shortcode,
        PhoneNumber: msisdn,
        CallBackURL: callbackUrl,
        AccountReference: 'SmartMarket',
        TransactionDesc: 'Deposit to SmartMarket',
      }),
    });

    const stkData = await stkRes.json();

    if (stkData.ResponseCode !== '0') {
      return NextResponse.json(
        { error: stkData.errorMessage || stkData.ResponseDescription || 'STK failed' },
        { status: 400 }
      );
    }

    // Record pending payment
    await supabase.from('payments').insert({
      user_id: user.id,
      amount: Number(amount),
      type,
      method: 'mpesa',
      status: 'pending',
      phone: msisdn,
      reference: stkData.CheckoutRequestID,
    });

    return NextResponse.json({
      message: 'STK Push sent',
      CheckoutRequestID: stkData.CheckoutRequestID,
      MerchantRequestID: stkData.MerchantRequestID,
    });
  } catch (err: any) {
    console.error('STK error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}