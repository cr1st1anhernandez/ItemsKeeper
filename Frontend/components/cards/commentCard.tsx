import { useAuth } from '@/contexts/authContext';
import { Comment } from '@/types';
import { Button } from '@nextui-org/button';
import { Card, CardHeader } from '@nextui-org/card';
import { Avatar } from '@nextui-org/react';
import { Trash2Icon, User2Icon } from 'lucide-react';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { user } = useAuth();
  const userId = user?.id;
  return (
    <Card key={comment.id}>
      <CardHeader className="justify-between">
        <div className="flex w-2/3 flex-col gap-2">
          <header className="flex items-center gap-4">
            <Avatar isBordered src="https://i.pravatar.cc/300" fallback={<User2Icon />} />
            <h4 className="text-lg font-bold">{comment.author}</h4>
          </header>
          <p className="text-pretty">{comment.text}</p>
        </div>
        {comment.userId === userId && (
          <Button size="sm" variant="flat" color="danger" isIconOnly>
            <Trash2Icon />
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};
