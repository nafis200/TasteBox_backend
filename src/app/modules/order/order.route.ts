import express from 'express';
import { OrderControllers } from './order-controller';
import ValidateRequest from '../../middleware/ValidateRequest';
import { OrderValidationSchema } from './order.validation';

const router = express.Router();

router.post('/',ValidateRequest(OrderValidationSchema),OrderControllers.OrderCar);

router.get('/verify', OrderControllers.verifyPayment);

router.get('/Surjopay',OrderControllers.getAllPaymentOrder)

export const OrderRoutes = router;
