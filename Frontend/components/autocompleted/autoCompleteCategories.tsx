import { Category } from '@/types';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { Key, useMemo, useState } from 'react';

type AutoCompleteCategoriesProps = {
  categories: Category[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const AutoCompleteCategories = ({
  categories,
  category,
  setCategory,
}: AutoCompleteCategoriesProps) => {
  const [touched, setTouched] = useState(false);

  const isValidCategory = useMemo(() => {
    return category !== '';
  }, [category]);

  const handleCategoryChange = (key: Key | null) => {
    if (key !== null) {
      setCategory(key.toString());
    }
  };

  return (
    <Autocomplete
      isRequired
      label="Category"
      variant="bordered"
      defaultItems={categories}
      errorMessage={isValidCategory || !touched ? '' : 'You must select a valid category'}
      isInvalid={!isValidCategory && touched}
      selectedKey={category}
      placeholder="Select a category"
      defaultSelectedKey="Technology"
      onClose={() => setTouched(true)}
      onSelectionChange={handleCategoryChange}
    >
      {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
};
