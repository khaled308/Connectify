import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string'
      })
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
      })
      .email('Email must be a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
      })
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string()
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword']
      });
    }
  });
