'use server';
import { SignupFormSchema } from '@/app/_lib/definitions';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { backendUrl } from '@/app/_lib/definitions';

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

  const response = await axios.post(`${backendUrl}auth/register`, {
    name,
    email,
    password,
  });
  if (response.status === 200) {
    if (response.data.numOfErrors === 0) {
      redirect('/auth/login');
    } else {
      return {
        message: response.data.message,
      };
    }
  }
}
