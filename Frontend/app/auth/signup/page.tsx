import { SignUpForm } from '@/app/auth/signup/form';
import { Toaster } from 'sonner';

export default function SignUpPage() {
  return (
    <div className="grid h-full w-full place-items-center px-8">
      <Toaster position="top-right" theme="dark" />
      <SignUpForm />
    </div>
  );
}
