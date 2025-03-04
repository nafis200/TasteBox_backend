import { z } from 'zod';

export const OrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    totalPrice: z
      .number()
      .nonnegative({ message: 'Total price must be a non-negative number' }),
    name: z.string().min(1, { message: 'Name is required' }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
  }),
});
