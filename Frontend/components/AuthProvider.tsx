'use client';

import { getUser } from '@/app/_data/user';
import { User } from '@/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
