
import { OrderServices } from './order.services';

import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendresponse';

export const OrderCar = catchAsync(async (req, res) => {
  const Orderdata = req.body;

  const createdOrder = await OrderServices.createOrderIntoDB(
    Orderdata,
    req.ip!,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order successfully done',
    data: createdOrder,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

const getAllPaymentOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllPaymentOrder(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Payment',
    data: result,
  });
});


export const OrderControllers = {
  OrderCar,
  verifyPayment,
  getAllPaymentOrder
};
