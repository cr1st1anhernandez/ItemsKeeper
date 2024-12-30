import { backendUrl } from '@/app/_lib/definitions';
import { Collection } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCollection = () => {
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);

  const fetchCollectionById = async (collectionId: number | null) => {
    if (!collectionId || isNaN(collectionId)) {
      setError('Invalid collection ID');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${backendUrl}collections/${collectionId}`);
      setCollection(data);
    } catch (error: any) {
      const status = error?.response?.status;
      setError(
        status === 404
          ? 'Collection not found'
          : 'Error fetching collection. Please try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionById(collectionId);
  }, [collectionId]);

  return { collection, isLoading, error, refetch: () => fetchCollectionById(collectionId) };
};
