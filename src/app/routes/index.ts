import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ProjectRoutes } from '../modules/project/project.route';
import { BlogsRoutes } from '../modules/blogs/blog.route';
import { MessageRoutes } from '../modules/message/message.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path:'/project',
    route:ProjectRoutes
  },
  {
    path:'/blogs',
    route:BlogsRoutes
  },
  {
    path:'/message',
    route:MessageRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
