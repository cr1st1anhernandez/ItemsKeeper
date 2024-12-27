import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import axios from 'axios';
import { useCallback, useState } from 'react';

interface UseDislikesProps {
  commentId: number;
}

export const useDislikes = ({ commentId }: UseDislikesProps) => {
  const { user } = useAuth();
  const jwt = user?.jwt;
  const [loading, setLoading] = useState(false);

  const fetchDislikes = useCallback(async () => {
    if (!jwt || !user?.id) return { dislikesCount: 0, isDisliked: false };

    try {
      const [dislikesCount, dislikeStatus] = await Promise.all([
        axios.get(`${backendUrl}comments/${commentId}/dislikes/count`, {
          headers: { Authorization: `Bearer ${jwt}` },
        }),
        axios.get(`${backendUrl}comments/${commentId}/status/disliked`, {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { userId: user.id },
        }),
      ]);

      return { dislikesCount: dislikesCount.data, isDisliked: dislikeStatus.data };
    } catch (error) {
      console.error('Error fetching dislikes:', error);
      return { dislikesCount: 0, isDisliked: false };
    }
  }, [commentId, jwt, user?.id]);

  const toggleDislike = useCallback(
    async (isDisliked: boolean) => {
      if (!jwt || !user?.id) return;

      setLoading(true);
      try {
        const action = isDisliked ? 'undislike' : 'dislike';
        await axios.post(
          `${backendUrl}comments/${commentId}/${action}`,
          { id: user.id },
          { headers: { Authorization: `Bearer ${jwt}` } },
        );
      } catch (error) {
        console.error('Error toggling dislike:', error);
      } finally {
        setLoading(false);
      }
    },
    [commentId, jwt, user],
  );

  return { fetchDislikes, toggleDislike, loading };
};
