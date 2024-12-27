import { Skeleton } from '@nextui-org/react';

export const ItemHeaderSkeleton = () => {
  return (
    <header className="flex flex-col gap-2">
      <div>
        <Skeleton className="h-14 w-64 rounded-lg md:w-96 lg:w-[30rem]" />
      </div>
      <div>
        <Skeleton className="h-[12rem] w-[20rem] rounded-xl">
          <div className="h-[12rem] w-[20rem] rounded-xl bg-default-300"></div>
        </Skeleton>
      </div>
      <Skeleton className="h-6 w-48 rounded-lg md:h-7">
        <div className="h-6 w-48 rounded-lg bg-default-200 md:h-7"></div>
      </Skeleton>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="rounded-full">
            <div className="h-6 w-16 rounded-full bg-default-200"></div>
          </Skeleton>
        ))}
      </div>
    </header>
  );
};
