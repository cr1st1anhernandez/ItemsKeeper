import { Categories } from '@/components/sections/categories';
import { RecentItems } from '@/components/sections/recentItems';
import { TopCollections } from '@/components/sections/topCollections';
export default async function HomePage() {
  return (
    <section className="flex w-full flex-col gap-8">
      <Categories />
      <TopCollections />
      <RecentItems />
    </section>
  );
}
