import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/Apperror';
import { OrderModels } from '../order/order.model';
import { User } from '../user/user-model';
import type { ICoupon } from './cupon_interface';
import cupon_model from './cupon_model';


const createCoupon = async (payload: ICoupon) => {
  if (!payload) {
    throw new Error('Coupon payload is undefined or null');
  }

  const coupon = await cupon_model.create(payload);
  return coupon;
};

export default createCoupon;
const getAllCoupons = async (query: Record<string, unknown>) => {
  const couponQuery = new QueryBuilder(cupon_model.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await couponQuery.modelQuery;
  const meta = await couponQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deleteCoupon = async (id: string) => {
  const deletedCoupon = await cupon_model.findByIdAndDelete(id);

  if (!deletedCoupon) {
    throw new AppError(404, 'Coupon not found or already deleted');
  }

  return deletedCoupon;
};

const findCouponByName = async (name: string) => {
  const coupon = await cupon_model.findOne({ coupon_name: name });

  if (!coupon) {
    throw new AppError(404, 'Coupon not found');
  }

  return coupon;
};


const Graph = async () => {
  const totalSum = await OrderModels.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$totalPrice' },
      },
    },
  ]);

  const totalEmailCount = await User.countDocuments({
    email: { $exists: true },
  });

  return {
     totalSum,
     totalEmailCount
  }
};

export const CuponService = {
  deleteCoupon,
  getAllCoupons,
  createCoupon,
  Graph,
  findCouponByName
};
