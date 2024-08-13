import { RecentItems } from '@/components/recentItems';
import { TopCollections } from '@/components/topCollections';
import { Categories } from '@/components/categories';
export default async function HomePage() {
  return (
    <section className="h-fit w-full py-8 md:py-10">
      <div className="flex h-fit w-full flex-col gap-8">
        <Categories />
        <TopCollections />
        <RecentItems />
      </div>
    </section>
  );
}
