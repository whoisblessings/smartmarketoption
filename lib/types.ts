export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  balance: number;
  total_invested: number;
  total_earned: number;
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: string;
  name: string;
  description: string | null;
  min_amount: number;
  max_amount: number | null;
  interest_rate: number; // daily % or period %
  duration_days: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Investment = {
  id: string;
  user_id: string;
  package_id: string;
  amount: number;
  interest_rate: number;
  expected_return: number;
  status: 'active' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string;
  created_at: string;
};

export type Payment = {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return';
  method: 'mpesa' | 'manual';
  status: 'pending' | 'completed' | 'failed';
  mpesa_receipt: string | null;
  phone: string | null;
  reference: string | null;
  created_at: string;
};

export type SiteStats = {
  total_users: number;
  total_investments: number;
  total_deposits: number;
  total_withdrawals: number;
  active_investments: number;
};