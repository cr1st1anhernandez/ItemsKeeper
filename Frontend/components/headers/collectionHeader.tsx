'use client';
import { CollectionHeaderSkeleton } from '@/components/skeletons/collectionHeaderSkeleton';
import { useCollection } from '@/hooks/useCollection';
import { Chip } from '@nextui-org/react';

export const CollectionHeader = () => {
  const { collection, isLoading } = useCollection();

  if (isLoading || !collection) {
    return <CollectionHeaderSkeleton />;
  }
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold md:text-5xl lg:text-6xl">{collection?.name}</h1>
        <Chip color="primary" variant="shadow">
          {collection?.category}
        </Chip>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl opacity-70 md:text-2xl">{collection?.description}</p>
        <p className="text-lg opacity-40 md:text-xl">Created by {collection?.creatorName}</p>
      </div>
    </header>
  );
};
