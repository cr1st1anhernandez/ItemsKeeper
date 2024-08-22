'use client';
import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Item } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useItemsOfCollection = (collectionId: number) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}collections/${collectionId}/items`);
        console.log(data);
        setItems(data);
      } catch (error) {
        setError('Error fetching items');
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addNewItem = async (newItem: Partial<Item>, onClose: () => void) => {
    setIsLoading(true);
    const { user } = useAuth();
    const jwt = user?.jwt;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${backendUrl}items/collection/${collectionId}`,
        newItem,
        config,
      );
      setItems((prev) => [...prev, data]);
      onClose();
      toast.success('Item created successfully');
    } catch (error) {
      setError('Error creating item');
    } finally {
      setIsLoading(false);
    }
  };

  return { items, isLoading, error, addNewItem };
};
