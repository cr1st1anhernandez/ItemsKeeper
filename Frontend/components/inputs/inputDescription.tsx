import { Textarea } from '@nextui-org/react';
import React, { useMemo } from 'react';

type InputDescriptionProps = {
  description: string;
  nameOfInput: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

export const InputDescription = ({
  description,
  setDescription,
  nameOfInput,
}: InputDescriptionProps) => {
  const validateDescription = (description: string) => /^[A-Za-z\s]{5,60}$/.test(description);

  const isInvalidDescription = useMemo(() => {
    if (description === '') return false;
    return !validateDescription(description);
  }, [description]);

  return (
    <Textarea
      isRequired
      variant="bordered"
      label="Description"
      placeholder={`Enter the description of your ${nameOfInput}`}
      value={description}
      onValueChange={setDescription}
      isInvalid={isInvalidDescription}
      color={isInvalidDescription ? 'danger' : 'default'}
      errorMessage="5-60 characters, no numbers or special characters."
      rows={4}
    />
  );
};
