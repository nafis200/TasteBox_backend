
import mongoose, { Schema } from 'mongoose';

import type { ICustomer } from './customer-interface';

const CustomerMealSchema: Schema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    image: { type: String},
    dietary_preferences: { type: [String], required: true },
    ingredient: { type: [String], required: true },
    portion_size: {
      type: String,
      enum: ['small', 'medium', 'high'],
      default: 'small',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    response: { type: String, default:"pending" },
  },
  { timestamps: true },
);

export default mongoose.model<ICustomer>('CustomerMeal', CustomerMealSchema);
