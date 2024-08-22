import { useCollections } from '@/hooks/useCollections';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export const DeleteCollection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);
  const { deleteCollection } = useCollections();
  const router = useRouter();
  const onDelete = () => {
    deleteCollection(collectionId);
    onOpenChange();
    router.push('/');
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly color="danger" variant="flat">
        <Trash2Icon className="text-2xl text-rose-600" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Collection</ModalHeader>
              <ModalBody>
                <p className="text-lg">Are you sure you want to delete your collection?</p>
                <p className="text-sm opacity-80">This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={onDelete}>
                  Delete Collection
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
