'use client';
import { ItemHeader } from '@/components/headers/itemHeader';
import { LoadingPage } from '@/components/loaders/loadingPage';
import { Comments } from '@/components/sections/comments';

export const Item = () => {
  const isLoading = false;

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-4">
      <ItemHeader />
      <Comments />
    </div>
  );
};
