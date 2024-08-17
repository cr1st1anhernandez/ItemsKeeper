import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';

export default function NewCollection() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter the name for your collection"
                  type="text"
                  variant="bordered"
                />
                <Input
                  label="Description"
                  placeholder="Enter the description of your collection"
                  type="text"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
