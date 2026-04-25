import StaffLayout from '@/components/staff/StaffLayout';
import { StaffAuthProvider } from '@/components/staff/StaffAuthProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StaffAuthProvider>
      <StaffLayout>{children}</StaffLayout>
    </StaffAuthProvider>
  );
}