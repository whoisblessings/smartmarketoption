import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Daraja STK Callback – updates payment status and credits user balance
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const callback = body?.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    const checkoutId = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;

    // Use service role if available for server-side updates
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    if (resultCode === 0) {
      // Success – extract amount & receipt
      const metadata = callback.CallbackMetadata?.Item || [];
      const amountItem = metadata.find((i: any) => i.Name === 'Amount');
      const receiptItem = metadata.find((i: any) => i.Name === 'MpesaReceiptNumber');

      const amount = amountItem?.Value;
      const receipt = receiptItem?.Value;

      // Find pending payment by reference
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('reference', checkoutId)
        .eq('status', 'pending')
        .single();

      if (payment) {
        await supabase
          .from('payments')
          .update({
            status: 'completed',
            mpesa_receipt: receipt || null,
          })
          .eq('id', payment.id);

        // Credit user balance
        const { data: profile } = await supabase
          .from('profiles')
          .select('balance')
          .eq('id', payment.user_id)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({ balance: (profile.balance || 0) + (amount || payment.amount) })
            .eq('id', payment.user_id);
        }
      }
    } else {
      // Failed
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('reference', checkoutId);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (err) {
    console.error('Callback error:', err);
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
}