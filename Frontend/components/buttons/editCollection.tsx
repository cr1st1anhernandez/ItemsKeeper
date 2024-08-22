import { Button } from '@nextui-org/button';
import { EditIcon } from 'lucide-react';

interface EditCollectionProps {
  collectionId: number;
}

export const EditCollection = ({ collectionId }: EditCollectionProps) => {
  return (
    <Button isIconOnly className="bg-transparent opacity-70">
      <EditIcon size={32} className="text-2xl" />
    </Button>
  );
};
