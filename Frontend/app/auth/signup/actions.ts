'use server';
import { SignupFormSchema } from '@/app/_lib/definitions';
import axios from 'axios';
import { redirect } from 'next/navigation';

const url = 'http://localhost:8080/api/v1/';

export async function signup(state: any, formData: FormData) {
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validationResult.data;

  const response = await axios.post(`${url}auth/register`, {
    name,
    email,
    password,
  });
  if (response.status === 200) {
    redirect('/auth/login');
  }
}
