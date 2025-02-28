

import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { MealValidationSchema } from './meal-validation';
import { MealController } from './meal-controller';


const router = express.Router();

router.post('/order',ValidateRequest(MealValidationSchema),MealController.createMeal)
router.get('/order',MealController.getAllMeal)



export const MealRoutes = router;

