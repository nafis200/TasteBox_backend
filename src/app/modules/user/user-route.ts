
import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { UserController } from './user-controller';
import { refreshTokenValidationSchema, Uservalidation } from './user-validation';

const router = express.Router();

router.post('/register',ValidateRequest(Uservalidation.userValidationSchema),UserController.createUser)

router.post('/login',ValidateRequest(Uservalidation.loginValidationSchema),UserController.loginUser)

router.put('/:projectId',UserController.UpdateInformations)

router.post(
    '/refresh-token',
    ValidateRequest(refreshTokenValidationSchema),
    UserController.refreshToken
  );

 router.get('/:email',UserController.getSingleEmail)

export const UserRoutes = router;

