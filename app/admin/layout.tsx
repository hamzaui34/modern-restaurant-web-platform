'use client';

import { motion } from 'framer-motion';
import AdminNav from '@/components/layout/AdminNav';
import AdminAuthProvider from '@/components/admin/AdminAuthProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="flex min-h-screen bg-surface">
        <AdminNav />
        <main className="flex-1 ml-64 pt-20">
          {children}
        </main>
      </div>
    </AdminAuthProvider>
  );
}