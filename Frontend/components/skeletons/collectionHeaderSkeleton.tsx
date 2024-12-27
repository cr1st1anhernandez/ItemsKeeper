import { Skeleton } from '@nextui-org/react';

export const CollectionHeaderSkeleton = () => {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-72 rounded-lg md:h-14 md:w-96 lg:h-16 lg:w-[25rem]" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-64 rounded-lg md:h-8 md:w-80" />
        <Skeleton className="h-5 w-40 rounded-lg md:h-6 md:w-52" />
      </div>
    </header>
  );
};
