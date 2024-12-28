'use client';
import { backendUrl } from '@/app/_lib/definitions';
import { CollectionCard } from '@/components/cards/collectionCard';
import { CollectionCardSkeleton } from '@/components/skeletons/collectionCardSkeleton';
import { useAuth } from '@/contexts/authContext';
import { useCategories } from '@/contexts/categoryContext';
import { Collection } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Category = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const params = useParams<{ categoryId: string }>();
  const categoryId = parseInt(params.categoryId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const jwt = user?.jwt;
  const { categories } = useCategories();
  const categoryName = categories.find((category) => category.id === categoryId)?.name || '';

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}collections/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        });
        console.log(data);
        setCollections(data);
      } catch (error) {
        setError('Error fetching collections');
      } finally {
        setIsLoading(false);
      }
    };
    if (user !== undefined) fetchCollections();
  }, [user, jwt]);

  return (
    <section className="flex w-full flex-col gap-8 text-pretty">
      <h1 className="text-3xl font-bold">{categoryName}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => <CollectionCardSkeleton key={index} />)
          : collections.map((collection) => <CollectionCard key={collection.id} {...collection} />)}
      </div>
    </section>
  );
};
