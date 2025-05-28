import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendresponse';
import httpStatus from 'http-status';
import { CuponService } from './cupon_services';

const createCoupon = catchAsync(async (req, res) => {
  const couponData = req.body;
  const result = await CuponService.createCoupon(couponData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon created successfully!',
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CuponService.getAllCoupons(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All coupons retrieved successfully!',
    data: result,
  });
});
const getSingleCoupons = catchAsync(async (req, res) => {
  const { name } = req.query;
  const result = await CuponService.findCouponByName(name as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SigleCOupon coupons retrieved successfully!',
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CuponService.deleteCoupon(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon deleted successfully!',
    data: result,
  });
});

const getGraph = catchAsync(async (req, res) => {
  const result = await CuponService.Graph();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All coupons retrieved successfully!',
    data: result,
  });
});

export const CuponController = {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  getGraph,
  getSingleCoupons,
};
