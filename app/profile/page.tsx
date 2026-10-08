'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import type { Profile } from '@/lib/types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(p);
      setLoading(false);
    }
    load();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <GlassCard className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <Icon name="person" size={32} className="text-accent" />
        </div>
        <div>
          <p className="text-lg font-bold">{profile?.full_name}</p>
          <p className="text-sm text-white/50">{profile?.email}</p>
          <p className="text-sm text-white/50">{profile?.phone}</p>
        </div>
      </GlassCard>

      <div className="space-y-2">
        {profile?.role === 'admin' && (
          <a
            href="/admin"
            className="glass-card flex items-center gap-3 p-4 hover:bg-white/10 transition"
          >
            <Icon name="admin_panel_settings" className="text-accent" />
            <span className="font-medium">Admin Panel</span>
            <Icon name="chevron_right" className="ml-auto text-white/30" />
          </a>
        )}

        <button
          onClick={handleLogout}
          className="glass-card flex w-full items-center gap-3 p-4 text-red-400 hover:bg-red-500/10 transition"
        >
          <Icon name="logout" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </AppShell>
  );
}