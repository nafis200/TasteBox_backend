import mongoose, { Schema } from 'mongoose';
import type { IMeal } from './meal-interface';

const MealSchema: Schema = new Schema<IMeal>(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    dietary_preferences: { type: [String], required: true },
    rating: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    portion_size: {
      type: String,
      enum: ['small', 'medium', 'high'],
      default: 'small',
    },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<IMeal>('Meal', MealSchema);
