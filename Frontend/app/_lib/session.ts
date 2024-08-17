import { User } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

const cookieConfig = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax' as 'lax', path: '/' },
};

export async function createSession(jwt: string, user: User) {
  const decodedToken = jwtDecode(jwt) as { exp: number };
  const expires = new Date(decodedToken.exp * 1000);

  const sessionData = {
    user: {
      ...user,
      jwt,
    },
  };

  cookies().set(cookieConfig.name, JSON.stringify(sessionData), {
    ...cookieConfig.options,
    expires,
  });
}

export const verifySession = async () => {
  const cookie = cookies().get(cookieConfig.name)?.value;
  const session = cookie ? JSON.parse(cookie) : undefined;

  if (!session?.user?.id || !session?.user?.jwt) {
    redirect('/');
  }
  const decodedToken = jwtDecode(session.user.jwt) as { exp: number };
  if (decodedToken.exp * 1000 < Date.now()) {
    deleteSession();
    redirect('/auth/login');
  }
  return { isAuth: true, user: session.user };
};

export async function deleteSession() {
  cookies().delete(cookieConfig.name);
}
