'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStaffAuth } from '@/components/staff/StaffAuthProvider';
import Card from '@/components/ui/Card';

export default function StaffLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useStaffAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/staff/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    
    if (result.success) {
      router.push('/staff/dashboard');
    } else {
      setError(result.error || 'Login failed');
      setIsSubmitting(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@royalember.com', password: 'admin123', role: 'Manager' },
    { email: 'chef@royalember.com', password: 'chef123', role: 'Chef' },
    { email: 'sarah@royalember.com', password: 'sarah123', role: 'Waiter' },
  ];

  const fillDemo = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#131313] via-[#1a1a1a] to-[#0f0f0f]" />
      
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(233, 195, 73, 0.15) 0%, transparent 60%)',
        }}
      />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary font-bold text-2xl">RE</span>
          </div>
          <h1 className="text-2xl md:text-headline-md font-headline-md text-secondary mb-2">
            Staff Portal
          </h1>
          <p className="text-on-surface-variant">Sign in to access the staff dashboard</p>
        </div>

        <Card className="p-6 md:p-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-base block mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary transition-colors"
                placeholder="staff@royalember.com"
                required
              />
            </div>

            <div>
              <label className="label-base block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-secondary text-surface font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-surface border-t-transparent rounded-full" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-secondary/10">
            <p className="text-label-caps text-on-surface-variant mb-4 text-center">DEMO ACCOUNTS</p>
            <div className="space-y-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => fillDemo(account.email, account.password)}
                  className="w-full p-3 bg-surface-container/50 rounded-lg hover:bg-surface-container transition-colors text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-on-surface">{account.role}</p>
                      <p className="text-xs text-on-surface-variant">{account.email}</p>
                    </div>
                    <span className="text-xs text-secondary">Tap to fill</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        <p className="text-center text-on-surface-variant text-sm mt-6">
          Need help? Contact your manager
        </p>
      </motion.div>
    </div>
  );
}