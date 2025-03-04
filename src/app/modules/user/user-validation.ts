import { z } from 'zod';
const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    phone_number: z
      .string()
      .length(11, { message: 'Phone number must be 11 digits' }),
    address: z.string().min(1, { message: 'Address is required' }),
    role: z.enum(['admin', 'user']).default('user'),

    isBlocked: z.boolean().default(false),
  }),
});

const loginValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  phone_number: z
    .string()
    .length(11, { message: 'Phone number must be 11 digits' })
    .optional(),
     password: z.string().min(0, { message: 'Password is required' }).optional(),
});
export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const Uservalidation = {
  userValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
