'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

const AdminNav = () => {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('royal-ember-admin');
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container/60 border-r border-secondary/10 pt-20 flex flex-col">
      <nav className="flex-1 px-4 py-8">
        <Link
          href="/admin"
          className="block px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high hover:text-secondary transition-colors mb-2"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/menu"
          className="block px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high hover:text-secondary transition-colors mb-2"
        >
          Menu Items
        </Link>
        <Link
          href="/admin/reservations"
          className="block px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high hover:text-secondary transition-colors mb-2"
        >
          Reservations
        </Link>
        <Link
          href="/admin/orders"
          className="block px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high hover:text-secondary transition-colors"
        >
          Orders
        </Link>
      </nav>

      <div className="p-4 border-t border-secondary/10">
        <Button variant="ghost" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminNav;
