'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStaffAuth } from '@/components/staff/StaffAuthProvider';
import { getStaffList, deleteStaffMember, addStaffMember, updateStaffMember, StaffMember } from '@/components/staff/staffTypes';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ROLES = ['manager', 'chef', 'waiter', 'host', 'bartender'] as const;
const SHIFTS = ['morning', 'evening', 'night'] as const;

export default function StaffAdminPage() {
  const { currentStaff } = useStaffAuth();
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'waiter' as StaffMember['role'],
    status: 'active' as StaffMember['status'],
    shift: 'evening' as StaffMember['shift'],
    password: '',
  });

  useEffect(() => {
    setStaffList(getStaffList());
  }, []);

  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || staff.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      alert('Please fill all required fields');
      return;
    }

    const success = addStaffMember(
      {
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        role: newStaff.role,
        status: newStaff.status,
        shift: newStaff.shift,
      },
      newStaff.password
    );

    if (success) {
      setStaffList(getStaffList());
      setShowAddModal(false);
      setNewStaff({ name: '', email: '', phone: '', role: 'waiter', status: 'active', shift: 'evening', password: '' });
    } else {
      alert('Staff with this email already exists');
    }
  };

  const handleDeleteStaff = (id: string) => {
    if (id === currentStaff?.id) {
      alert('You cannot delete yourself');
      return;
    }
    deleteStaffMember(id);
    setStaffList(getStaffList());
    setShowDeleteConfirm(null);
  };

  const handleToggleStatus = (staff: StaffMember) => {
    updateStaffMember(staff.id, { status: staff.status === 'active' ? 'inactive' : 'active' });
    setStaffList(getStaffList());
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <p className="text-label-caps text-secondary mb-2">STAFF MANAGEMENT</p>
          <h1 className="text-2xl md:text-section-title">Staff Admin Panel</h1>
          <p className="text-on-surface-variant mt-2">Manage your restaurant staff members</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Staff Member
          </span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary transition-colors"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary transition-colors"
        >
          <option value="all">All Roles</option>
          {ROLES.map(role => (
            <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
          ))}
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="border-b border-secondary/20">
                <tr>
                  <th className="px-4 py-3 text-label-caps">Staff Member</th>
                  <th className="px-4 py-3 text-label-caps hidden sm:table-cell">Role</th>
                  <th className="px-4 py-3 text-label-caps hidden md:table-cell">Shift</th>
                  <th className="px-4 py-3 text-label-caps">Status</th>
                  <th className="px-4 py-3 text-label-caps">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="border-b border-surface-container/50 hover:bg-surface-container/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                          {staff.avatar ? (
                            <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-secondary font-semibold">
                              {staff.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">{staff.name}</p>
                          <p className="text-xs text-on-surface-variant">{staff.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(staff.role)}`}>
                        {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-on-surface capitalize">{staff.shift} shift</span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleToggleStatus(staff)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          staff.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {staff.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowEditModal(true);
                          }}
                          className="p-2 hover:bg-surface-container rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(staff.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStaff.length === 0 && (
              <div className="text-center py-12">
                <p className="text-on-surface-variant">No staff members found</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-secondary/20 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-semibold text-secondary mb-6">Add New Staff Member</h2>
              <div className="space-y-4">
                <div>
                  <label className="label-base">Full Name *</label>
                  <input
                    type="text"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="label-base">Email *</label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="label-base">Phone</label>
                  <input
                    type="tel"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-base">Role</label>
                    <select
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as StaffMember['role'] })}
                      className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                    >
                      {ROLES.map(role => (
                        <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-base">Shift</label>
                    <select
                      value={newStaff.shift}
                      onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value as StaffMember['shift'] })}
                      className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                    >
                      {SHIFTS.map(shift => (
                        <option key={shift} value={shift}>{shift.charAt(0).toUpperCase() + shift.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-base">Password *</label>
                  <input
                    type="password"
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container rounded-lg border border-secondary/20 focus:border-secondary"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddStaff} className="flex-1">
                  Add Staff
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-red-500/20 rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold text-red-400 mb-4">Delete Staff Member</h2>
              <p className="text-on-surface-variant mb-6">Are you sure you want to delete this staff member? This action cannot be undone.</p>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => handleDeleteStaff(showDeleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600">
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}