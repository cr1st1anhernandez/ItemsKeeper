import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Collection } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCollection = () => {
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const jwt = user?.jwt;
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const fetchCollectionById = async (collectionId: number | null) => {
      if (!collectionId) return;
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}collections/${collectionId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        });
        setCollection(data);
      } catch (error) {
        setError('Error fetching collection');
      } finally {
        setIsLoading(false);
      }
    };
    if (user !== undefined) fetchCollectionById(collectionId);
  }, [user, jwt]);

  return { collection, isLoading, error, setCollection };
};
