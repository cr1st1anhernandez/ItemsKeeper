'use client';

import { AutoCompleteTags } from '@/components/autocompleted/autoCompleteTags';
import { InputName } from '@/components/inputs/inputName';
import { UploaderImages } from '@/components/uploaders/uploaderImages';
import { useAuth } from '@/contexts/authContext';
import { useItems } from '@/hooks/useItems';
import { File } from '@/types';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import '@uploadcare/react-uploader/core.css';
import { PlusIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Toaster } from 'sonner';

interface AddItemProps {
  collectionId: number;
}

export const AddItem = () => {
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);
  const { theme } = useTheme();
  const { user } = useAuth();

  const toasterTheme = theme === 'light' ? 'light' : 'dark';
  const uploaderClassName = theme === 'dark' ? 'uc-dark' : 'uc-light';
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { createItem, isLoading } = useItems();

  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState('');

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
      name: name,
      tags: tags,
      imageUrl: updatedImageUrl,
      collectionId: collectionId,
    };

    createItem(newItem, () => {
      clearAllInputs();
      onClose();
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster richColors theme={toasterTheme} />
      <Button
        endContent={<PlusIcon className="text-2xl" />}
        onPress={onOpen}
        color="primary"
        className="font-semibold md:w-fit"
      >
        Add Item
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Item</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => handleSubmit(e, onClose)} className="flex flex-col gap-4">
                  <InputName nameOfInput="collection" name={name} setName={setName} />
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
    </>
  );
};
