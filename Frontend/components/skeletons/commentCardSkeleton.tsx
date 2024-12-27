import { Skeleton } from '@nextui-org/react';

export const CommentCardSkeleton = () => {
  return (
    <div className="flex gap-2">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex w-full flex-col">
        <header className="flex items-center gap-4">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </header>
        <Skeleton className="mt-2 h-4 w-full rounded-md" />
        <footer className="mt-2 flex items-center gap-4">
          <Skeleton className="h-6 w-8 rounded-md" />
          <Skeleton className="h-6 w-8 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </footer>
      </div>
    </div>
  );
};
