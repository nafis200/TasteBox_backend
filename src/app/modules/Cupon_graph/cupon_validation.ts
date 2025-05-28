import { z } from 'zod';

export const CouponValidationSchema = z.object({
  body: z.object({
    coupon_name: z.string().min(1, 'Coupon name is required'),
    code: z
      .number({ invalid_type_error: 'Code must be a number' })
      .max(100, 'Code must not be greater than 100'),
  }),
});
