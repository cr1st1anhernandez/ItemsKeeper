'use client';
import { CollectionCard } from '@/components/cards/collectionCard';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import { AutoCompleteCategories } from '@/components/autocompleted/autoCompleteCategories';
import { InputDescription } from '@/components/inputs/inputDescription';
import { InputName } from '@/components/inputs/inputName';
import { LoadingPage } from '@/components/loaders/loadingPage';
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

  if (!user || !categories) return <LoadingPage />;
  return (
    <section className="h-fit w-full py-8 md:py-10">
      <div className="flex h-fit w-full flex-col gap-8">
        <Toaster richColors theme={toasterTheme} />
        <Button
          className="w-fit font-semibold"
          onPress={onOpen}
          color="primary"
          endContent={<PlusIcon className="text-2xl" />}
          variant="shadow"
        >
          Add new collection
        </Button>
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
        <div className="flex flex-wrap gap-8">
          {isLoading
            ? Array.from({ length: 16 }).map((_, index) => (
                <Card
                  key={index}
                  className="flex w-full max-w-[20rem] flex-col items-start justify-start p-4 text-left"
                >
                  <CardHeader className="flex-col items-start">
                    <Skeleton className="w-full rounded-lg">
                      <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </CardHeader>
                  <CardBody className="w-full overflow-visible">
                    <Skeleton className="rounded-lg">
                      <div className="h-[12rem] w-[20rem] rounded-xl bg-default-300"></div>
                    </Skeleton>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start justify-start gap-2 text-left">
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-14 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </CardFooter>
                </Card>
              ))
            : collections.map((collection) => (
                <CollectionCard key={collection.id} {...collection} />
              ))}
        </div>
      </div>
    </section>
  );
};
