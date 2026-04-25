'use client';

import { motion } from 'framer-motion';
import { useStaffAuth } from '@/components/staff/StaffAuthProvider';
import { getStaffList } from '@/components/staff/staffTypes';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function StaffDashboard() {
  const { currentStaff } = useStaffAuth();
  const staffList = getStaffList();
  const activeStaff = staffList.filter(s => s.status === 'active');
  const morningShift = staffList.filter(s => s.shift === 'morning' && s.status === 'active');
  const eveningShift = staffList.filter(s => s.shift === 'evening' && s.status === 'active');
  const nightShift = staffList.filter(s => s.shift === 'night' && s.status === 'active');

  const getCurrentShift = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return 'morning';
    if (hour >= 14 && hour < 22) return 'evening';
    return 'night';
  };

  const currentShift = getCurrentShift();

  const stats = [
    { label: 'Total Staff', value: staffList.length, icon: 'users', color: 'bg-blue-500/20 text-blue-400' },
    { label: 'Active Now', value: activeStaff.length, icon: 'check', color: 'bg-green-500/20 text-green-400' },
    { label: 'Morning Shift', value: morningShift.length, icon: 'sun', color: 'bg-yellow-500/20 text-yellow-400' },
    { label: 'Evening Shift', value: eveningShift.length, icon: 'moon', color: 'bg-purple-500/20 text-purple-400' },
  ];

  const getStatIcon = (icon: string) => {
    switch (icon) {
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'sun':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'moon':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <p className="text-label-caps text-secondary mb-2">WELCOME BACK</p>
          <h1 className="text-2xl md:text-section-title">
            Hello, {currentStaff?.name?.split(' ')[0] || 'Staff Member'}
          </h1>
          <p className="text-on-surface-variant mt-2">
            {currentStaff?.role && (
              <span className="capitalize">{currentStaff.role}</span>
            )} • Current Shift: <span className="text-secondary capitalize">{currentShift}</span>
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-on-surface-variant">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm text-on-surface">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  {getStatIcon(stat.icon)}
                </div>
              </div>
              <p className="text-3xl font-bold text-on-surface">{stat.value}</p>
              <p className="text-sm text-on-surface-variant">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-secondary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/staff/admin"
                className="p-4 bg-surface-container/50 rounded-lg hover:bg-surface-container transition-colors text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-on-surface">Manage Staff</p>
              </Link>
              <Link
                href="/staff/profile"
                className="p-4 bg-surface-container/50 rounded-lg hover:bg-surface-container transition-colors text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-on-surface">My Profile</p>
              </Link>
              <Link
                href="/admin"
                className="p-4 bg-surface-container/50 rounded-lg hover:bg-surface-container transition-colors text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-on-surface">Admin Panel</p>
              </Link>
              <a
                href="/"
                className="p-4 bg-surface-container/50 rounded-lg hover:bg-surface-container transition-colors text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-on-surface">View Website</p>
              </a>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-secondary mb-4">Active Staff ({currentShift} shift)</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {staffList
                .filter(s => s.shift === currentShift && s.status === 'active')
                .slice(0, 5)
                .map((staff) => (
                  <div key={staff.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container/50">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                      {staff.avatar ? (
                        <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary font-semibold">
                          {staff.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-on-surface truncate">{staff.name}</p>
                      <p className="text-xs text-on-surface-variant capitalize">{staff.role}</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                ))}
              {staffList.filter(s => s.shift === currentShift && s.status === 'active').length === 0 && (
                <p className="text-sm text-on-surface-variant text-center py-4">No active staff on this shift</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-4 md:p-6">
          <h2 className="text-lg font-semibold text-secondary mb-4">Today&apos;s Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-container/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-secondary">
                {staffList.filter(s => s.status === 'active').length}
              </p>
              <p className="text-xs text-on-surface-variant">Active Staff</p>
            </div>
            <div className="p-4 bg-surface-container/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-secondary">
                {staffList.filter(s => s.status === 'active').length}
              </p>
              <p className="text-xs text-on-surface-variant">On Duty</p>
            </div>
            <div className="p-4 bg-surface-container/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-secondary">
                {staffList.filter(s => s.role === 'manager').length}
              </p>
              <p className="text-xs text-on-surface-variant">Managers</p>
            </div>
            <div className="p-4 bg-surface-container/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-secondary">
                {staffList.length}
              </p>
              <p className="text-xs text-on-surface-variant">Total Team</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}