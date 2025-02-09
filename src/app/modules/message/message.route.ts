
import express from 'express';
import auth from '../../middleware/auth';
import { MessageController } from './message.controller';


const router = express.Router();

router.post('/', auth('admin'), MessageController.createMessage);

router.get('/', auth('admin'), MessageController.getAllMessage);


export const MessageRoutes = router;