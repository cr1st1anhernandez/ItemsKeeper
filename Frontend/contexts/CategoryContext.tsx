'use client';

import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Category } from '@/types';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CategoryContextProps {
  categories: Category[];
  isLoading: boolean;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const jwt = user?.jwt;

  useEffect(() => {
    const fetchCategories = async () => {
      if (!jwt) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        };

        const { data } = await axios.get(`${backendUrl}categories`, config);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [jwt]);

  return (
    <CategoryContext.Provider value={{ categories, isLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
