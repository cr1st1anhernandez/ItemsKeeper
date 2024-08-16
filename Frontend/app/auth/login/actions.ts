'use server';
import { SigninFormSchema, backendUrl } from '@/app/_lib/definitions';
import { createSession } from '@/app/_lib/session';
import axios from 'axios';

export async function login(state: any, formData: FormData) {
  const validationResult = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validationResult.data;
  const response = await axios.post(`${backendUrl}auth/login`, {
    email,
    password,
  });
  if (response.status === 200) {
    if (response.data.numOfErrors === 0) {
      await createSession(response.data.jwt, response.data.user);
      return { success: true };
    } else {
      return {
        message: response.data.error,
      };
    }
  }
  return { success: false, message: 'Login failed' };
}
