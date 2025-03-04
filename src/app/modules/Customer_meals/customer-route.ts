


import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { CustomerMealValidationSchema } from './customer-validation';
import { CustomerMealController } from './customer-controller';
;


const router = express.Router();

router.post('/order',ValidateRequest(CustomerMealValidationSchema),CustomerMealController.createCustomerMeal)
router.get('/orders',CustomerMealController.getAllCustomerMeal)
router.put('/order/:projectId',CustomerMealController.UpdateCustomerMeal)
router.put('/response/:projectId',CustomerMealController.UpdateResponse)


export const CustomerMealRoutes = router;

