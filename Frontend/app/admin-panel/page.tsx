import { Admin } from '@/components/sections/admin';

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-3xl">Admin panel</h2>
      </header>
      <Admin />
    </div>
  );
}
