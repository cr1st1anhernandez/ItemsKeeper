import { MyCollections } from '@/components/myCollections';

export default function Page() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-3xl">My collections</h2>
      </header>
      <MyCollections />
    </div>
  );
}
