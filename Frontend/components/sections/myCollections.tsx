'use client';
import { CollectionCard } from '@/components/cards/collectionCard';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import { AutoCompleteCategories } from '@/components/autocompleted/autoCompleteCategories';
import { InputDescription } from '@/components/inputs/inputDescription';
import { InputName } from '@/components/inputs/inputName';
import { CollectionCardSkeleton } from '@/components/skeletons/collectionCardSkeleton';
import { UploaderImages } from '@/components/uploaders/uploaderImages';
import { useAuth } from '@/contexts/authContext';
import { useCategories } from '@/contexts/categoryContext';
import { useCollections } from '@/hooks/useCollections';
import { Collection, File } from '@/types';
import { useTheme } from 'next-themes';

export const MyCollections = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { categories } = useCategories();

  const userId = user?.id;
  const toasterTheme = theme === 'light' ? 'light' : 'dark';
  const uploaderClassName = theme === 'dark' ? 'uc-dark' : 'uc-light';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { collections, isLoading, addNewCollection } = useCollections();
  const [myCollections, setMyCollections] = useState<Collection[]>([]);

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (collections) {
      setMyCollections(collections);
    }
  }, [collections]);

  const clearAllInputs = () => {
    setName('');
    setDescription('');
    setCategory('');
    setFiles([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, onClose: () => void) => {
    event.preventDefault();
    if (!name || !description || !category) return;

    const selectedFile = files.find((file) => file.cdnUrl);
    const updatedImageUrl = selectedFile
      ? selectedFile.cdnUrl
      : 'https://ucarecdn.com/0c42c108-cdb1-4530-b290-82ab33c42724/-/preview/512x512/';

    const newCollection = {
      name,
      description,
      category,
      imageUrl: updatedImageUrl,
      userId,
    };
    setMyCollections([...myCollections, newCollection]);
    addNewCollection(newCollection, () => {
      clearAllInputs();
      onClose();
    });
  };

  return (
    <section className="h-fit w-full">
      <div className="relative flex h-fit w-full flex-col gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-4xl">My collections</h2>
            <p className="font-semibold opacity-50">A list of all your collections</p>
          </div>
          <Button
            className="w-fit font-semibold"
            onPress={onOpen}
            color="primary"
            endContent={<PlusIcon className="text-2xl" />}
            variant="shadow"
          >
            Add new collection
          </Button>
        </header>
        <Toaster theme={toasterTheme} />
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Create collection</ModalHeader>
                <ModalBody>
                  <form onSubmit={(e) => handleSubmit(e, onClose)} className="flex flex-col gap-4">
                    <InputName nameOfInput="collection" name={name} setName={setName} />
                    <InputDescription
                      nameOfInput="collection"
                      description={description}
                      setDescription={setDescription}
                    />
                    <AutoCompleteCategories
                      categories={categories}
                      category={category}
                      setCategory={setCategory}
                    />
                    <UploaderImages
                      uploaderName="collection"
                      files={files}
                      setFiles={setFiles}
                      uploaderClassName={uploaderClassName}
                    />
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
          {isLoading
            ? Array.from({ length: 16 }).map((_, index) => <CollectionCardSkeleton key={index} />)
            : collections.map((collection) => (
                <CollectionCard key={collection.id} {...collection} />
              ))}
        </div>
      </div>
    </section>
  );
};
