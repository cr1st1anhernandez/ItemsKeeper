import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Item } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);
  const { user } = useAuth();
  const jwt = user?.jwt;

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}collections/${collectionId}/items`);
      setItems(data);
    } catch (error) {
      setError('Error fetching items');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}items/recent`);
      setRecentItems(data);
    } catch (error) {
      setError('Error fetching recent items');
    } finally {
      setIsLoading(false);
    }
  };

  const createItem = async (newItem: any, onClose: () => void) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${backendUrl}items`, newItem, config);
      setItems((prev) => [...prev, data]);
      onClose();
      toast.success('Item created successfully');
    } catch (error) {
      setError('Error creating item');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentItems();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [collectionId]);

  return {
    recentItems,
    items,
    isLoading,
    error,
    createItem,
  };
};
