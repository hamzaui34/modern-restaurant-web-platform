export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'chef' | 'waiter' | 'host' | 'bartender';
  status: 'active' | 'inactive';
  joinDate: string;
  shift: 'morning' | 'evening' | 'night';
  avatar?: string;
}

export interface StaffAuth {
  isAuthenticated: boolean;
  currentStaff: StaffMember | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (staff: Omit<StaffMember, 'id' | 'joinDate'>, password: string) => Promise<boolean>;
}

const STAFF_STORAGE_KEY = 'royal-ember-staff';
const STAFF_AUTH_KEY = 'royal-ember-staff-auth';

export const defaultStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@royalember.com',
    phone: '03165774335',
    role: 'manager',
    status: 'active',
    joinDate: '2024-01-15',
    shift: 'evening',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Chef Hassan Khan',
    email: 'chef@royalember.com',
    phone: '03165774336',
    role: 'chef',
    status: 'active',
    joinDate: '2024-02-01',
    shift: 'morning',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Sarah Ahmed',
    email: 'sarah@royalember.com',
    phone: '03165774337',
    role: 'waiter',
    status: 'active',
    joinDate: '2024-03-10',
    shift: 'evening',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Mohammad Ali',
    email: 'mohammad@royalember.com',
    phone: '03165774338',
    role: 'bartender',
    status: 'active',
    joinDate: '2024-04-05',
    shift: 'night',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '5',
    name: 'Fatima Malik',
    email: 'fatima@royalember.com',
    phone: '03165774339',
    role: 'host',
    status: 'inactive',
    joinDate: '2024-01-20',
    shift: 'evening',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
];

export const staffPasswords: Record<string, string> = {
  'admin@royalember.com': 'admin123',
  'chef@royalember.com': 'chef123',
  'sarah@royalember.com': 'sarah123',
  'mohammad@royalember.com': 'mohammad123',
  'fatima@royalember.com': 'fatima123',
};

export const getStaffList = (): StaffMember[] => {
  if (typeof window === 'undefined') return defaultStaff;
  const stored = localStorage.getItem(STAFF_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultStaff;
    }
  }
  localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(defaultStaff));
  return defaultStaff;
};

export const saveStaffList = (staff: StaffMember[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staff));
};

export const addStaffMember = (staff: Omit<StaffMember, 'id' | 'joinDate'>, password: string): boolean => {
  const list = getStaffList();
  if (list.some(s => s.email === staff.email)) {
    return false;
  }
  const newStaff: StaffMember = {
    ...staff,
    id: `staff-${Date.now()}`,
    joinDate: new Date().toISOString().split('T')[0],
  };
  staffPasswords[staff.email] = password;
  list.push(newStaff);
  saveStaffList(list);
  return true;
};

export const deleteStaffMember = (id: string): boolean => {
  const list = getStaffList();
  const staff = list.find(s => s.id === id);
  if (staff) {
    delete staffPasswords[staff.email];
  }
  const filtered = list.filter(s => s.id !== id);
  saveStaffList(filtered);
  return true;
};

export const updateStaffMember = (id: string, updates: Partial<StaffMember>): boolean => {
  const list = getStaffList();
  const index = list.findIndex(s => s.id === id);
  if (index === -1) return false;
  list[index] = { ...list[index], ...updates };
  saveStaffList(list);
  return true;
};

export const authenticateStaff = (email: string, password: string): StaffMember | null => {
  if (staffPasswords[email] === password) {
    const list = getStaffList();
    return list.find(s => s.email === email) || null;
  }
  return null;
};

export const getCurrentStaff = (): StaffMember | null => {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem(STAFF_AUTH_KEY);
  if (auth) {
    try {
      return JSON.parse(auth);
    } catch {
      return null;
    }
  }
  return null;
};

export const setCurrentStaff = (staff: StaffMember | null) => {
  if (typeof window === 'undefined') return;
  if (staff) {
    localStorage.setItem(STAFF_AUTH_KEY, JSON.stringify(staff));
  } else {
    localStorage.removeItem(STAFF_AUTH_KEY);
  }
};

export const logoutStaff = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STAFF_AUTH_KEY);
};