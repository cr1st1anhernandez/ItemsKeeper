import { useAuth } from '@/contexts/authContext';
import { Comment } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { backendUrl } from './../app/_lib/definitions';
export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ itemId: string }>();
  const itemId = parseInt(params.itemId);
  const { user } = useAuth();
  const jwt = user?.jwt;
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}comments/${itemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });
      setComments(data);
    } catch (error) {
      setError('Error fetching comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user !== undefined) fetchComments();
  }, [user]);

  const addNewComment = async (newComment: Partial<Comment>) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}comments`, newComment, {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });
      setComments((prev) => [...prev, data]);
    } catch (error) {
      setError('Error creating comment');
      console.error('Error creating comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    const previousComments = [...comments];

    setComments((prev) => prev.filter((comment) => comment.id !== commentId));

    try {
      await axios.delete(`${backendUrl}comments/${commentId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });
    } catch (error) {
      setComments(previousComments);
      setError('Error deleting comment');
      console.error('Error deleting comment:', error);
    }
  };
  return { addNewComment, comments, isLoading, error, deleteComment };
};
