'use server';
import { SigninFormSchema } from '@/app/_lib/definitions';
import { createSession } from '@/app/_lib/session';
import axios from 'axios';

const url = 'http://localhost:8080/api/v1/';

export async function signin(state: any, formData: FormData) {
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
  const response = await axios.post(`${url}auth/login`, {
    email,
    password,
  });
  createSession(response.data.jwt, response.data.userId);
}
