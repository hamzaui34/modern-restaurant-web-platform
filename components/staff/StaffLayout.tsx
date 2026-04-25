'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStaffAuth } from './StaffAuthProvider';
import StaffNav from './StaffNav';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useStaffAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/staff/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary font-bold text-2xl">RE</span>
          </div>
          <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full mx-auto" />
          <p className="text-on-surface-variant mt-4">Loading staff portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary font-bold text-2xl">RE</span>
          </div>
          <p className="text-on-surface-variant">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <StaffNav />
      <main className="flex-1 ml-64">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}