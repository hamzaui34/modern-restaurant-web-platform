'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStaffAuth } from './StaffAuthProvider';

const StaffNav = () => {
  const pathname = usePathname();
  const { currentStaff, logout } = useStaffAuth();

  const navItems = [
    { href: '/staff/dashboard', label: 'Dashboard', icon: 'home' },
    { href: '/staff/admin', label: 'Staff Management', icon: 'users' },
    { href: '/staff/profile', label: 'My Profile', icon: 'user' },
  ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'logout':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-secondary/10 flex flex-col z-50">
      <div className="p-6 border-b border-secondary/10">
        <Link href="/staff/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary font-bold text-lg">RE</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-secondary">Royal Ember</h1>
            <p className="text-xs text-on-surface-variant">Staff Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-secondary/20 text-secondary'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-secondary'
              }`}
            >
              {getIcon(item.icon)}
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {currentStaff && (
        <div className="p-4 border-t border-secondary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
              {currentStaff.avatar ? (
                <img src={currentStaff.avatar} alt={currentStaff.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary font-semibold">
                  {currentStaff.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-on-surface truncate">{currentStaff.name}</p>
              <p className="text-xs text-on-surface-variant capitalize">{currentStaff.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            {getIcon('logout')}
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default StaffNav;