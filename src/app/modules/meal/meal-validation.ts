import { z } from 'zod';

export const MealValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Meal name is required'),
    cuisine: z.string().min(1, 'Cuisine is required'),
    dietary_preferences: z.array(z.string()).min(1, 'At least one dietary preference is required'),
    rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    availability: z.boolean(),
    portion_size: z.string().min(1, 'Portion size is required'),
    price: z.number().min(0, 'Price must be a positive number').max(1000000, 'Price seems too high!'),
  }),
});


