

import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { MealValidationSchema } from './meal-validation';
import { MealController } from './meal-controller';


const router = express.Router();

router.post('/menu',ValidateRequest(MealValidationSchema),MealController.createMeal)
router.get('/orders',MealController.getAllMeal)
router.put('/menu/:projectId',MealController.UpdateMeal)


export const MealRoutes = router;

// 