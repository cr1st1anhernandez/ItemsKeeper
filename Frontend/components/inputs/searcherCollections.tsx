'use client';
import { Button, Input } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SearcherCollections = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  interface HandleKeyPressEvent extends React.KeyboardEvent<HTMLInputElement> {}

  const handleKeyPress = (e: HandleKeyPressEvent) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      navigateToSearch();
    }
  };

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleChange = (e: HandleChangeEvent) => {
    setQuery(e.target.value);
  };

  const navigateToSearch = () => {
    if (query.trim() !== '') {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <Input
      classNames={{
        base: 'max-w-full sm:max-w-[40rem] h-10',
        mainWrapper: 'h-full',
        inputWrapper:
          'h-full font-normal text-default-500 pr-0 bg-default-400/20 dark:bg-default-500/20',
      }}
      placeholder="What are you looking for?"
      size="sm"
      endContent={
        <Button
          className="bg-transparent"
          isIconOnly
          onClick={navigateToSearch}
          endContent={<SearchIcon />}
        ></Button>
      }
      type="search"
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};
