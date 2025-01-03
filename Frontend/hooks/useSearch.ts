import { backendUrl } from '@/app/_lib/definitions';
import { Collection, Item } from '@/types';
import axios from 'axios';
import useSWR from 'swr';

interface SearchResultDTO {
  collections: Collection[];
  items: Item[];
}

export const useSearch = (query: string, page: number = 0, size: number = 10) => {
  const fetcher = async (url: string): Promise<SearchResultDTO> => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data, error, isLoading } = useSWR<SearchResultDTO>(
    query
      ? `${backendUrl}search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`
      : null,
    fetcher,
  );

  return {
    collections: data?.collections || [],
    items: data?.items || [],
    isLoading,
    error,
  };
};
