import { Categories } from '@/components/categories';
import { RecentItems } from '@/components/recentItems';
import { TopCollections } from '@/components/topCollections';
export default async function HomePage() {
  return (
    <section className="my-8 flex w-full flex-col gap-8">
      <Categories />
      <TopCollections />
      <RecentItems />
    </section>
  );
}
