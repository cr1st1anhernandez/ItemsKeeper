import { useAuth } from '@/contexts/authContext';
import { useDislikes } from '@/hooks/useDislikes';
import { useLikes } from '@/hooks/useLikes';
import { Comment } from '@/types';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { EllipsisIcon, ThumbsDownIcon, ThumbsUpIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CommentCardProps {
  comment: Comment;
  onDelete: () => Promise<void>;
}

export const CommentCard = ({ comment, onDelete }: CommentCardProps) => {
  const { user } = useAuth();
  const [numLikes, setNumLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [numDislikes, setNumDislikes] = useState(0);
  const [isDisliked, setIsDisliked] = useState(false);

  const {
    fetchLikes,
    toggleLike,
    loading: likeLoading,
  } = useLikes({
    commentId: comment.id,
  });

  const {
    fetchDislikes,
    toggleDislike,
    loading: dislikeLoading,
  } = useDislikes({
    commentId: comment.id,
  });

  useEffect(() => {
    const loadLikes = async () => {
      const { likesCount, isLiked } = await fetchLikes();
      setNumLikes(likesCount);
      setIsLiked(isLiked);
    };

    const loadDislikes = async () => {
      const { dislikesCount, isDisliked } = await fetchDislikes();
      setNumDislikes(dislikesCount);
      setIsDisliked(isDisliked);
    };

    loadLikes();
    loadDislikes();
  }, [fetchLikes, fetchDislikes]);

  const handleLike = async () => {
    if (likeLoading || dislikeLoading) return;

    const previousLikes = numLikes;
    const previousIsLiked = isLiked;
    const previousDislikes = numDislikes;
    const previousIsDisliked = isDisliked;

    setIsLiked(!isLiked);
    setNumLikes(isLiked ? numLikes - 1 : numLikes + 1);

    if (isDisliked) {
      setIsDisliked(false);
      setNumDislikes(numDislikes - 1);
    }

    try {
      await toggleLike(isLiked);
    } catch (error) {
      setIsLiked(previousIsLiked);
      setNumLikes(previousLikes);
      setIsDisliked(previousIsDisliked);
      setNumDislikes(previousDislikes);
      console.error('Error toggling like:', error);
    }
  };

  const handleDislike = async () => {
    if (likeLoading || dislikeLoading) return;

    const previousLikes = numLikes;
    const previousIsLiked = isLiked;
    const previousDislikes = numDislikes;
    const previousIsDisliked = isDisliked;

    setIsDisliked(!isDisliked);
    setNumDislikes(isDisliked ? numDislikes - 1 : numDislikes + 1);

    if (isLiked) {
      setIsLiked(false);
      setNumLikes(numLikes - 1);
    }

    try {
      await toggleDislike(isDisliked);
    } catch (error) {
      setIsLiked(previousIsLiked);
      setNumLikes(previousLikes);
      setIsDisliked(previousIsDisliked);
      setNumDislikes(previousDislikes);
      console.error('Error toggling dislike:', error);
    }
  };

  const isAuthor = user?.id === comment.userId;

  return (
    <div className="flex gap-2">
      <div className="flex size-12 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-300 dark:border-zinc-600">
        <img src="https://i.pravatar.cc/300" alt="avatar" className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <header className="flex items-center gap-4">
          <h4 className="text-lg font-bold">{comment.author}</h4>
          <p className="text-sm text-gray-500">5 hours ago</p>
        </header>
        <p className="text-pretty">{comment.text}</p>
        <footer className="flex items-center gap-4">
          <span
            className={`flex items-center justify-center gap-1 text-sm ${
              isLiked ? 'text-orange-400' : ''
            }`}
          >
            <button
              type="button"
              onClick={handleLike}
              disabled={likeLoading || dislikeLoading}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <ThumbsUpIcon size={20} />
            </button>
            {numLikes}
          </span>
          <span
            className={`flex items-center justify-center gap-1 text-sm ${
              isDisliked ? 'text-orange-400' : ''
            }`}
          >
            <button
              type="button"
              onClick={handleDislike}
              disabled={likeLoading || dislikeLoading}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <ThumbsDownIcon size={20} />
            </button>
            {numDislikes}
          </span>
          {isAuthor && (
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <EllipsisIcon size={20} />
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownSection title="Danger zone">
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    description="Permanently delete this comment"
                    startContent={<TrashIcon />}
                    onClick={onDelete}
                  >
                    Delete comment
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          )}
        </footer>
      </div>
    </div>
  );
};
