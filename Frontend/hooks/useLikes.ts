import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import axios from 'axios';
import { useCallback, useState } from 'react';

interface UseLikesProps {
  commentId: number;
}

export const useLikes = ({ commentId }: UseLikesProps) => {
  const { user } = useAuth();
  const jwt = user?.jwt;
  const [loading, setLoading] = useState(false);

  const fetchLikes = useCallback(async () => {
    if (!jwt || !user?.id) return { likesCount: 0, isLiked: false };

    try {
      const [likesCount, likeStatus] = await Promise.all([
        axios.get(`${backendUrl}comments/${commentId}/likes/count`, {
          headers: { Authorization: `Bearer ${jwt}` },
        }),
        axios.get(`${backendUrl}comments/${commentId}/status/liked`, {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { userId: user.id },
        }),
      ]);

      return { likesCount: likesCount.data, isLiked: likeStatus.data };
    } catch (error) {
      console.error('Error fetching likes:', error);
      return { likesCount: 0, isLiked: false };
    }
  }, [commentId, jwt, user?.id]);

  const toggleLike = useCallback(
    async (isLiked: boolean) => {
      if (!jwt || !user?.id) return;

      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        };
        if (isLiked) {
          await axios.post(`${backendUrl}comments/${commentId}/unlike`, user, config);
        } else {
          await axios.post(`${backendUrl}comments/${commentId}/like`, user, config);
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      } finally {
        setLoading(false);
      }
    },
    [commentId, jwt, user],
  );

  return { fetchLikes, toggleLike, loading };
};
