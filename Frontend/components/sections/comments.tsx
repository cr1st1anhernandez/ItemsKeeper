'use client';

import { CommentCard } from '@/components/cards/commentCard';
import { useAuth } from '@/contexts/authContext';
import { useComments } from '@/hooks/useComments';
import { Comment } from '@/types';
import { Button, Input, ScrollShadow, Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const Comments = () => {
  const { comments, isLoading, error, addNewComment } = useComments();
  const [inputValue, setInputValue] = useState<string>('');
  const params = useParams<{ itemId: string }>();
  const itemId = parseInt(params.itemId);
  const user = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment: Partial<Comment> = {
      itemId: itemId,
      text: inputValue,
    };
    addNewComment(newComment);
  };

  return (
    <>
      <h2 className="text-2xl md:text-4xl">Comments</h2>
      <div className="relative w-full max-w-[60rem] rounded-md bg-neutral-200 p-4 dark:bg-neutral-900">
        <ScrollShadow hideScrollBar className="h-[18rem] w-full max-w-[60rem]">
          {isLoading && (
            <Spinner label="Loading comments..." color="primary" labelColor="primary" />
          )}
          {error && <p>{error}</p>}
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <CommentCard comment={comment} key={index} />
            ))}
          </div>
        </ScrollShadow>

        <footer className="sticky bottom-4 mt-4">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Add a comment..."
              variant="faded"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full"
              size="lg"
            />
            {user ? (
              <Button isLoading={isLoading} type="submit" size="lg">
                {isLoading ? 'Adding...' : 'Add Comment'}
              </Button>
            ) : (
              <Button isDisabled size="lg">
                Login to comment
              </Button>
            )}
          </form>
        </footer>
      </div>
    </>
  );
};
