import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Item } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useItem = () => {
  const params = useParams<{ itemId: string }>();
  const itemId = parseInt(params.itemId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const jwt = user?.jwt;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItemById = async (itemId: number | null) => {
      if (!itemId) return;
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        });
        setItem(data);
      } catch (error) {
        setError('Error fetching collection');
      } finally {
        setIsLoading(false);
      }
    };
    if (user !== undefined) fetchItemById(itemId);
  }, [user, jwt]);

  return { item, isLoading, error };
};
