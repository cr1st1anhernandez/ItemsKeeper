import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import { Comment } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ itemId: string }>();
  const itemId = parseInt(params.itemId);
  const { user } = useAuth();
  const jwt = user?.jwt;

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendUrl}comments/${itemId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        });
        setComments(data);
      } catch (error) {
        setError('Error fetching comments');
      } finally {
        setIsLoading(false);
      }
    };
    if (user !== undefined) fetchComments();
  }, [user, jwt]);

  const addNewComment = async (newComment: Partial<Comment>) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${backendUrl}comments`, newComment, config);
      setComments((prev) => [...prev, data]);
    } catch (error) {
      setError('Error creating comment');
      console.error('Error creating comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addNewComment,
    comments,
    isLoading,
    error,
  };
};
