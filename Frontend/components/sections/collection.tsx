'use client';

import { AutoCompleteTags } from '@/components/autocompleted/autoCompleteTags';
import { CollectionHeader } from '@/components/headers/collectionHeader';
import { InputName } from '@/components/inputs/inputName';
import { Items } from '@/components/lists/items';
import { LoadingPage } from '@/components/loaders/loadingPage';
import { UploaderImages } from '@/components/uploaders/uploaderImages';
import { useItems } from '@/hooks/useItems';
import { File, Item } from '@/types';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Collection = () => {
  const { items, isLoading, createItem } = useItems();
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);
  const [clientItems, setClientItems] = useState<Item[]>();
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState('');
  const { theme } = useTheme();
  const toasterTheme = theme === 'light' ? 'light' : 'dark';
  const uploaderClassName = theme === 'dark' ? 'uc-dark' : 'uc-light';
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const clearAllInputs = () => {
    setTags([]);
    setFiles([]);
    setName('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, onClose: () => void) => {
    event.preventDefault();
    if (!name) return;

    const selectedFile = files.find((file) => file.cdnUrl);
    const updatedImageUrl = selectedFile
      ? selectedFile.cdnUrl
      : 'https://ucarecdn.com/0c42c108-cdb1-4530-b290-82ab33c42724/-/preview/512x512/';

    const newItem = {
      collectionId: collectionId,
      name: name,
      tags: tags,
      imageUrl: updatedImageUrl,
    };

    createItem(newItem, () => {
      clearAllInputs();
      onClose();
    });
  };

  useEffect(() => {
    if (items) {
      setClientItems(items);
    }
  }, [items]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-4">
      <CollectionHeader />
      <Button
        className="w-fit font-semibold"
        endContent={<PlusIcon />}
        color="primary"
        onPress={onOpen}
      >
        Add item
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Item</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => handleSubmit(e, onClose)} className="flex flex-col gap-4">
                  <InputName nameOfInput="item" name={name} setName={setName} />
                  <AutoCompleteTags setTags={setTags} />
                  <UploaderImages
                    uploaderName="item"
                    uploaderClassName={uploaderClassName}
                    files={files}
                    setFiles={setFiles}
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
                      {isLoading ? 'Creating...' : 'Create Item'}
                    </Button>
                  </footer>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Items items={clientItems} />
    </div>
  );
};
