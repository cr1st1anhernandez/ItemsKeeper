'use client';

import { Category } from '@/types';
import { Button, Link, Skeleton } from '@nextui-org/react';
import axios from 'axios';
import { SparklesIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="h-fit w-full py-8 md:py-10">
      <div className="flex h-fit w-full flex-col gap-8">
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
    </section>
  );
};
