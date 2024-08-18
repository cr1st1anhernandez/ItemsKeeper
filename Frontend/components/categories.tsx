'use client';

import { useCategories } from '@/contexts/CategoryContext';
import { Button, Link, Skeleton } from '@nextui-org/react';
import { SparklesIcon } from 'lucide-react';

export const Categories = () => {
  const { categories, isLoading } = useCategories();

  return (
    <div className="flex h-fit w-full flex-col gap-6">
      <header className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-3xl">Categories</h2>
        <SparklesIcon className="text-orange-400" />
      </header>
      <div className="flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-40 rounded-lg" />
            ))
          : categories.map((category, index) => (
              <Button
                key={index}
                href={`/category/[${category.name}]`}
                className="cursor-pointer bg-gradient-to-br from-orange-400 to-amber-400 font-bold shadow-md shadow-orange-400/40"
                as={Link}
                color="primary"
                radius="sm"
                variant="shadow"
              >
                {category.name}
              </Button>
            ))}
      </div>
    </div>
  );
};
