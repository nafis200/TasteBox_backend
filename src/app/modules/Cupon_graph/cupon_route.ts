import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { CuponController } from './cupon_controller';
import { CouponValidationSchema } from './cupon_validation';


const router = express.Router();

router.post('/', ValidateRequest(CouponValidationSchema), CuponController.createCoupon);
router.get('/', CuponController.getAllCoupons);
router.get('/graph', CuponController.getGraph);
router.delete('/:id', CuponController.deleteCoupon);
router.get('/find', CuponController.getSingleCoupons);
export const CuponRoutes = router;

// 
