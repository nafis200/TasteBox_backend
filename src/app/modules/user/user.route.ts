import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { UserValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';



const router = express.Router()

router.post('/login',ValidateRequest(UserValidationSchema),UserControllers.loginUser)

router.post('/register',ValidateRequest(UserValidationSchema),UserControllers.RegisterUser)

export const UserRoutes = router