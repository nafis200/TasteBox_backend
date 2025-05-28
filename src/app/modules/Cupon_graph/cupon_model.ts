import mongoose, { Schema } from 'mongoose';
import type { ICoupon } from './cupon_interface';


const CouponSchema: Schema = new Schema<ICoupon>(
  {
    coupon_name: { type: String, required: true },
    code: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICoupon>('Coupon', CouponSchema);
