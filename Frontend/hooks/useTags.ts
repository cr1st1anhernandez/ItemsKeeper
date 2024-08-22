import { backendUrl } from '@/app/_lib/definitions';
import { Tag } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTags = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}tags`);
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, isLoading, error };
};
