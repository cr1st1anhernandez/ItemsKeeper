import { Input } from '@nextui-org/input';
import React, { useMemo } from 'react';

type InputNameProps = {
  name: string;
  nameOfInput: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const InputName = ({ name, setName, nameOfInput }: InputNameProps) => {
  const validateName = (name: string) => /^[A-Za-z\s]{3,30}$/.test(name);
  const isInvalidName = useMemo(() => {
    if (name === '') return false;
    return validateName(name) ? false : true;
  }, [name]);

  return (
    <Input
      value={name}
      minLength={2}
      maxLength={31}
      isInvalid={isInvalidName}
      color={isInvalidName ? 'danger' : 'default'}
      errorMessage={isInvalidName ? '3-30 characters, no numbers or special characters.' : ''}
      onValueChange={setName}
      isRequired
      autoFocus
      label="Name"
      placeholder={`Enter the name of your ${nameOfInput}`}
      type="text"
      variant="bordered"
    />
  );
};
