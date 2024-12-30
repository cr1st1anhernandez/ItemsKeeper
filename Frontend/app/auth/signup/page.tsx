'use client';
import { SignUpForm } from '@/app/auth/signup/form';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export default function SignUpPage() {
  const { theme } = useTheme();
  const toasterTheme = theme === 'light' ? 'light' : 'dark';
  return (
    <div className="grid h-full w-full place-items-center px-8">
      <Toaster position="top-right" theme={toasterTheme} />
      <SignUpForm />
    </div>
  );
}
