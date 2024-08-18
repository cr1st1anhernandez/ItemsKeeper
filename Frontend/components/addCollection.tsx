'use client';

import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/components/AuthProvider';
import { useCategories } from '@/contexts/CategoryContext';
import { Collection, File } from '@/types';
import { Input } from '@nextui-org/input';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Key, useMemo, useState } from 'react';
import { Toaster, toast } from 'sonner';

export const AddCollection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { theme } = useTheme();
  const toasterTheme = theme === 'light' ? 'light' : 'dark';
  const { user } = useAuth();
  const { categories } = useCategories();
  const userId = user?.id;
  const jwt = user?.jwt;
  const [isLoading, setIsLoading] = useState(false);

  const uploaderClassName = theme === 'dark' ? 'uc-dark' : 'uc-light';
  const [files, setFiles] = useState<File[]>([]);

  const [name, setName] = useState('');
  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);
  const isInvalidName = useMemo(() => {
    if (name === '') return false;

    return validateName(name) ? false : true;
  }, [name]);

  const [description, setDescription] = useState('');
  const validateDescription = (description: string) => /^[A-Za-z\s]+$/.test(description);
  const isInvalidDescription = useMemo(() => {
    if (description === '') return false;

    return validateDescription(description) ? false : true;
  }, [description]);

  const [category, setCategory] = useState('');
  const [touched, setTouched] = useState(false);
  const isValidCategory = useMemo(() => {
    return category !== '';
  }, [category]);
  const handleCategoryChange = (key: Key | null) => {
    if (key !== null) {
      setCategory(key.toString());
    }
  };

  const [imageUrl] = useState(
    'https://ucarecdn.com/0c42c108-cdb1-4530-b290-82ab33c42724/gallery.png',
  );

  const handleChangeEvent = (items: any) => {
    setFiles([...items.allEntries.filter((file: File) => file.status === 'success')]);
  };

  const clearAllInputs = () => {
    setName('');
    setDescription('');
    setCategory('');
    setFiles([]);
    setTouched(false);
  };

  const addNewCollection = async (newCollection: Collection, onClose: () => void) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}collections`, newCollection, config);
      onClose();
      toast.success('Collection created successfully');
      clearAllInputs();
    } catch (error) {
      console.error('Error creating collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, onClose: () => void) => {
    event.preventDefault();
    if (isInvalidName || isInvalidDescription || !isValidCategory) return;
    const selectedFile = files.find((file) => file.cdnUrl);
    const updatedImageUrl = selectedFile ? selectedFile.cdnUrl : imageUrl;
    const newCollection = {
      name: name,
      description: description,
      category: category,
      imageUrl: updatedImageUrl,
      userId: userId,
    };
    addNewCollection(newCollection, onClose);
  };

  if (!user || !categories) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster richColors theme={toasterTheme} />
      <Tooltip placement="right" closeDelay={0} content="Add new">
        <Button
          className="hover: bg-default bg-transparent text-neutral-950 dark:text-neutral-100"
          isIconOnly
          onPress={onOpen}
          color="primary"
        >
          <PlusIcon className="text-2xl" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create collection</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => handleSubmit(e, onClose)} className="flex flex-col gap-4">
                  <Input
                    value={name}
                    minLength={3}
                    maxLength={30}
                    isInvalid={isInvalidName}
                    color={isInvalidDescription ? 'danger' : 'default'}
                    errorMessage={
                      isInvalidName ? '3-30 characters, no numbers or special characters.' : ''
                    }
                    onValueChange={setName}
                    isRequired
                    autoFocus
                    label="Name"
                    placeholder="Enter the name for your collection"
                    type="text"
                    variant="bordered"
                  />
                  <Input
                    value={description}
                    minLength={5}
                    maxLength={60}
                    isInvalid={isInvalidDescription}
                    color={isInvalidDescription ? 'danger' : 'default'}
                    errorMessage={
                      isInvalidDescription
                        ? '3-60 characters, no numbers or special characters.'
                        : ''
                    }
                    onValueChange={setDescription}
                    isRequired
                    label="Description"
                    placeholder="Enter the description of your collection"
                    type="text"
                    variant="bordered"
                  />
                  <Autocomplete
                    isRequired
                    label="Category"
                    variant="bordered"
                    defaultItems={categories}
                    errorMessage={
                      isValidCategory || !touched ? '' : 'You must select a valid category'
                    }
                    isInvalid={isValidCategory || !touched ? false : true}
                    selectedKey={category}
                    placeholder="Select a category"
                    defaultSelectedKey="Technology"
                    onClose={() => setTouched(true)}
                    onSelectionChange={handleCategoryChange}
                  >
                    {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
                  </Autocomplete>
                  <div className="text-sm opacity-70">
                    <span className="font-bold opacity-65">(Optional)</span>
                    <p className="font-semibold">Upload a cover image for your collection</p>
                  </div>
                  <FileUploaderRegular
                    pubkey="0407729b2887e266d3b0"
                    maxLocalFileSizeBytes={5000000}
                    multiple={false}
                    imgOnly={true}
                    onChange={handleChangeEvent}
                    sourceList="local, url, camera"
                    classNameUploader={`my-config ${uploaderClassName}`}
                  />
                  <div>
                    {files.map((file) => (
                      <div className="overflow-hidden rounded-lg" key={file.uuid}>
                        <img src={file.cdnUrl} alt={file.fileInfo.originalFilename} />
                      </div>
                    ))}
                  </div>
                  <footer className="flex w-full justify-end">
                    <Button
                      isLoading={isLoading}
                      disabled={isLoading}
                      type="submit"
                      color="primary"
                    >
                      {isLoading ? 'Creating...' : 'Create Collection'}
                    </Button>
                  </footer>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
