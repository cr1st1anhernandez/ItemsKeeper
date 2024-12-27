'use client';
import { ItemHeader } from '@/components/headers/itemHeader';
import { Comments } from '@/components/sections/comments';

export const Item = () => {
  return (
    <div className="flex flex-col gap-4">
      <ItemHeader />
      <Comments />
    </div>
  );
};
