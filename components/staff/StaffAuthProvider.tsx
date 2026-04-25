'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  StaffMember, 
  getCurrentStaff, 
  setCurrentStaff as saveCurrentStaff, 
  logoutStaff,
  authenticateStaff 
} from './staffTypes';

interface StaffAuthContextType {
  currentStaff: StaffMember | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(undefined);

export function useStaffAuth() {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error('useStaffAuth must be used within StaffAuthProvider');
  }
  return context;
}

interface StaffAuthProviderProps {
  children: ReactNode;
}

export function StaffAuthProvider({ children }: StaffAuthProviderProps) {
  const router = useRouter();
  const [currentStaff, setStaff] = useState<StaffMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const staff = getCurrentStaff();
    setStaff(staff);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const staff = authenticateStaff(email, password);
      if (staff) {
        saveCurrentStaff(staff);
        setStaff(staff);
        return { success: true };
      }
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    logoutStaff();
    setStaff(null);
    router.push('/staff/login');
  };

  return (
    <StaffAuthContext.Provider
      value={{
        currentStaff,
        isLoading: !mounted || isLoading,
        isAuthenticated: mounted && !!currentStaff,
        login,
        logout,
      }}
    >
      {children}
    </StaffAuthContext.Provider>
  );
}