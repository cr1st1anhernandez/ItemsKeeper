import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must not exceed 32 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9]).{8,32}$/,
      'Password must contain at least one uppercase letter and one number',
    ),
});

export const SigninFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must not exceed 32 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9]).{8,32}$/,
      'Password must contain at least one uppercase letter and one number',
    ),
});

export const backendUrl = 'http://localhost:8080/api/v1/';
