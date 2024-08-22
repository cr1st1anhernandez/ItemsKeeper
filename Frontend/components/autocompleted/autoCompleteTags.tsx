import { useTags } from '@/hooks/useTags';
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react';
import React from 'react';

type AutoCompleteTagsProps = {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export const AutoCompleteTags = ({ setTags }: AutoCompleteTagsProps) => {
  const { tags } = useTags();
  const [value, setValue] = React.useState<string>('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const updateTags = (newTags: string[]) => {
    setSelectedTags(newTags);
    setTags(newTags);
  };

  const onSelectionChange = (key: React.Key | null) => {
    if (key) {
      const selectedTag = tags.find((tag) => tag.name === key);
      if (selectedTag && !selectedTags.includes(selectedTag.name)) {
        updateTags([...selectedTags, selectedTag.name]);
      }
    }
  };

  const onInputChange = (value: string) => {
    setValue(value);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && value && !selectedTags.includes(value)) {
      updateTags([...selectedTags, value]);
      setValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex w-full flex-col">
      <Autocomplete
        label="Select tags"
        variant="bordered"
        defaultItems={tags}
        className="max-w-xs"
        allowsCustomValue={true}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        value={value}
      >
        {(tag) => <AutocompleteItem key={tag.name}>{tag.name}</AutocompleteItem>}
      </Autocomplete>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedTags.map((tag, index) => (
          <Chip onClose={() => handleRemoveTag(tag)} key={index} color="warning" variant="dot">
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};
