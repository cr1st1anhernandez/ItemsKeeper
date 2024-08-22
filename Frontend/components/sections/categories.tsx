'use client';

import { useCategories } from '@/contexts/categoryContext';
import { Card, CardHeader, Skeleton } from '@nextui-org/react';
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
              <Skeleton key={index} className="h-10 w-20 rounded-lg" />
            ))
          : categories.map((category, index) => (
              <Card key={index} radius="sm">
                <CardHeader className="font-bold">{category.name}</CardHeader>
              </Card>
            ))}
      </div>
    </div>
  );
};
