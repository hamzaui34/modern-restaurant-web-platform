'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStaffAuth } from '@/components/staff/StaffAuthProvider';
import { updateStaffMember } from '@/components/staff/staffTypes';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function StaffProfile() {
  const { currentStaff, logout } = useStaffAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: currentStaff?.name || '',
    phone: currentStaff?.phone || '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  if (!currentStaff) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleSave = () => {
    if (editedProfile.name && currentStaff) {
      updateStaffMember(currentStaff.id, {
        name: editedProfile.name,
        phone: editedProfile.phone,
      });
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      window.location.reload();
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'manager': return 'bg-purple-500/20 text-purple-400';
      case 'chef': return 'bg-orange-500/20 text-orange-400';
      case 'waiter': return 'bg-blue-500/20 text-blue-400';
      case 'host': return 'bg-pink-500/20 text-pink-400';
      case 'bartender': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning': return 'bg-yellow-500/20 text-yellow-400';
      case 'evening': return 'bg-purple-500/20 text-purple-400';
      case 'night': return 'bg-indigo-500/20 text-indigo-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-label-caps text-secondary mb-2">MY PROFILE</p>
        <h1 className="text-2xl md:text-section-title">Staff Profile</h1>
      </motion.div>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
        >
          <p className="text-green-400 text-center">Profile updated successfully!</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container border-4 border-secondary/20">
              {currentStaff.avatar ? (
                <img src={currentStaff.avatar} alt={currentStaff.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary text-3xl font-bold">
                  {currentStaff.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-semibold text-secondary">{currentStaff.name}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(currentStaff.role)}`}>
                  {currentStaff.role.charAt(0).toUpperCase() + currentStaff.role.slice(1)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getShiftColor(currentStaff.shift)}`}>
                  {currentStaff.shift.charAt(0).toUpperCase() + currentStaff.shift.slice(1)} Shift
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentStaff.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {currentStaff.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            {!isEditing && (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-base mb-2 block">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                  />
                ) : (
                  <p className="text-on-surface">{currentStaff.name}</p>
                )}
              </div>
              <div>
                <label className="label-base mb-2 block">Email Address</label>
                <p className="text-on-surface">{currentStaff.email}</p>
              </div>
              <div>
                <label className="label-base mb-2 block">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                  />
                ) : (
                  <p className="text-on-surface">{currentStaff.phone || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className="label-base mb-2 block">Role</label>
                <p className="text-on-surface capitalize">{currentStaff.role}</p>
              </div>
              <div>
                <label className="label-base mb-2 block">Shift</label>
                <p className="text-on-surface capitalize">{currentStaff.shift} shift</p>
              </div>
              <div>
                <label className="label-base mb-2 block">Member Since</label>
                <p className="text-on-surface">
                  {new Date(currentStaff.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4 border-t border-secondary/10">
                <Button variant="secondary" onClick={() => {
                  setIsEditing(false);
                  setEditedProfile({ name: currentStaff.name, phone: currentStaff.phone });
                }} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-secondary mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button
              onClick={logout}
              className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-left transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-red-400">Sign Out</p>
                  <p className="text-xs text-on-surface-variant">Log out of your account</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-secondary mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/staff/dashboard"
              className="p-4 bg-surface-container/50 hover:bg-surface-container rounded-lg transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-on-surface">Dashboard</span>
            </a>
            <a
              href="/staff/admin"
              className="p-4 bg-surface-container/50 hover:bg-surface-container rounded-lg transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-on-surface">Staff Management</span>
            </a>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}