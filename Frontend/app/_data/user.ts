'use server';
import { deleteSession, verifySession } from '@/app/_lib/session';
import { User } from '@/types';
import { cache } from 'react';

export const getSession = async () => {
  return await verifySession();
};

export const getUser = cache(async (): Promise<User | null> => {
  const session = await getSession();
  return session?.user ?? null;
});
