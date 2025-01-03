'use client';
import { CollectionCard } from '@/components/cards/collectionCard';
import { ItemCard } from '@/components/cards/itemCard';
import { CollectionCardSkeleton } from '@/components/skeletons/collectionCardSkeleton';
import { ItemCardSkeleton } from '@/components/skeletons/itemCardSkeleton';
import { useSearch } from '@/hooks/useSearch';
import { useParams } from 'next/navigation';
export const Query = () => {
  const params = useParams<{ query: string }>();
  const { collections, items, isLoading, error } = useSearch(params.query, 0, 10);
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <ItemCardSkeleton key={index} />)
          : items.map((item, index) => <ItemCard key={index} {...item} />)}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => <CollectionCardSkeleton key={index} />)
          : collections.map((collection) => <CollectionCard key={collection.id} {...collection} />)}
      </div>
    </>
  );
};
