import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const cookieConfig = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax' as 'lax', path: '/' },
  duration: 60 * 60 * 24 * 14,
};

export async function createSession(jwt: string, userId: number) {
  const expires = new Date(Date.now() + cookieConfig.duration * 1000);
  const session = JSON.stringify({ jwt, userId, expires });

  cookies().set(cookieConfig.name, session, { ...cookieConfig.options, expires });
  redirect('/');
}

export async function verifySession() {
  const sessionCookie = cookies().get(cookieConfig.name)?.value;

  if (!sessionCookie) {
    redirect('/auth/login');
  }

  const session = JSON.parse(sessionCookie);

  if (!session?.jwt || !session?.userId) {
    redirect('/auth/login');
  }

  try {
    const decoded = jwt.decode(session.jwt) as jwt.JwtPayload;
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      redirect('/auth/login');
    }
    return { userId: session.userId };
  } catch (error) {
    redirect('/auth/login');
  }
}

export async function deleteSession() {
  cookies().delete(cookieConfig.name);
  redirect('/auth/login');
}
