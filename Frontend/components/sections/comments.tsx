import { CommentCard } from '@/components/cards/commentCard';
import { CommentCardSkeleton } from '@/components/skeletons/commentCardSkeleton';
import { useComments } from '@/hooks/useComments';
import { Comment } from '@/types';
import { Button, Divider, Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const Comments = () => {
  const { comments, isLoading, error, addNewComment, deleteComment } = useComments();
  const [inputValue, setInputValue] = useState<string>('');
  const params = useParams<{ itemId: string }>();
  const itemId = parseInt(params.itemId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const newComment: Partial<Comment> = {
      itemId: itemId,
      text: inputValue,
    };

    addNewComment(newComment);
    setInputValue('');
  };

  const handleDelete = useCallback(
    async (commentId: number) => {
      await deleteComment(commentId);
    },
    [deleteComment],
  );

  return (
    <>
      <form
        className="rounded-md bg-[#f2f2f2] outline outline-2 outline-transparent transition-all focus-within:outline-gray-400 dark:bg-[#282727]"
        onSubmit={handleSubmit}
      >
        <textarea
          className="h-14 w-full resize-none overflow-y-auto rounded-md border-none bg-transparent p-4 outline-none"
          placeholder="Add a comment..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <footer className="flex items-center justify-end p-4">
          <Button color="primary" size="lg" type="submit" isDisabled={!inputValue.trim()}>
            {isLoading ? 'Adding' : 'Submit'}
            {isLoading && <Spinner color="white" />}
          </Button>
        </footer>
      </form>
      <Divider className="my-4" />
      <div className="flex gap-2">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="h-fit w-fit rounded-full bg-[#f4af39] px-1 text-white">
          {comments.length}
        </div>
      </div>
      <div className="flex h-[20rem] w-full flex-col gap-4 overflow-y-auto">
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => <CommentCardSkeleton key={index} />)
          : comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onDelete={() => handleDelete(comment.id)}
              />
            ))}
      </div>
    </>
  );
};
