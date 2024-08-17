import { Categories } from '@/components/categories';
import { RecentItems } from '@/components/recentItems';
import { TopCollections } from '@/components/topCollections';
export default async function HomePage() {
  return (
    <section className="h-fit w-full">
      <div className="flex h-fit w-full flex-col gap-8">
        <Categories />
        <TopCollections />
        <RecentItems />
      </div>
    </section>
  );
}
