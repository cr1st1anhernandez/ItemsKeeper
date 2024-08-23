import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Collection } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const jwt = user?.jwt;

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}collections/user`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        });
        setCollections(data);
      } catch (error) {
        setError('Error fetching collections');
      } finally {
        setIsLoading(false);
      }
    };
    if (user !== undefined) fetchCollections();
  }, [user, jwt]);

  useEffect;

  const addNewCollection = async (newCollection: Collection, onClose: () => void) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${backendUrl}collections`, newCollection, config);
      setCollections((prev) => [...prev, data]);
      onClose();
      toast.success('Collection created successfully');
    } catch (error) {
      setError('Error creating collection');
      console.error('Error creating collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCollection = async (collectionId: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${backendUrl}collections/${collectionId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      });
      setCollections((prev) => prev.filter((collection) => collection.id !== collectionId));
      toast.success('Collection deleted successfully');
    } catch (error) {
      setError('Error deleting collection');
      console.error('Error deleting collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCollection = async (collectionId: number, updatedCollection: Partial<Collection>) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${backendUrl}collections/${collectionId}`,
        updatedCollection,
        config,
      );
      setCollections((prev) =>
        prev.map((collection) =>
          collection.id === collectionId ? { ...collection, ...data } : collection,
        ),
      );
      toast.success('Collection updated successfully');
    } catch (error) {
      setError('Error updating collection');
      console.error('Error updating collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    collections,
    isLoading,
    error,
    addNewCollection,
    deleteCollection,
    updateCollection,
  };
};
