import { z } from 'zod';

export const CustomerMealValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Meal name is required'),
    cuisine: z.string().min(1, 'Cuisine is required'),
    dietary_preferences: z.array(z.string()).min(1, 'At least one dietary preference is required'),
    portion_size: z.string().min(1, 'Portion size is required'),
  }),
});


