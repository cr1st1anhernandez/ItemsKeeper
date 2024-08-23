'use client';

import { useCollection } from '@/hooks/useCollection';
import { Chip, Skeleton } from '@nextui-org/react';

export const CollectionHeader = () => {
  const { collection, isLoading } = useCollection();

  return (
    <header className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        {isLoading ? (
          <Skeleton className="h-24 w-full max-w-[35rem] rounded-lg" />
        ) : (
          <>
            <h1 className="text-3xl font-semibold md:text-5xl lg:text-6xl">{collection?.name}</h1>
            <Chip color="primary" variant="shadow">
              {collection?.category}
            </Chip>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-12 w-full max-w-[24rem] rounded-lg" />
            <Skeleton className="h-8 w-full max-w-[15rem] rounded-lg" />
          </div>
        ) : (
          <>
            <p className="text-xl opacity-70 md:text-2xl lg:text-3xl">{collection?.description}</p>
            <p className="text-lg font-semibold opacity-40 md:text-xl">
              Created by {collection?.creatorName}
            </p>
          </>
        )}
      </div>
    </header>
  );
};
