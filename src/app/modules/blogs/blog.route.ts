import express from 'express';
import auth from '../../middleware/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/', auth('admin'), BlogController.createBlogs);

router.get('/', BlogController.getAllBlogs);

router.put('/:projectId', auth('admin'), BlogController.UpdateSingleBlogs);

router.delete('/:projectId', auth('admin'), BlogController.DeleteBlogs);

export const BlogsRoutes = router;
