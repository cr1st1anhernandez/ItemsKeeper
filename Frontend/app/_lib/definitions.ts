import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least one uppercase letter and one special character',
    ),
});

export const SigninFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least one uppercase letter and one special character',
    ),
});
