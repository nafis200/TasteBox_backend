import { Router } from 'express';
import { UserRoutes } from '../modules/user/user-route';
import { MealRoutes } from '../modules/meal/meal-route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes
  },
  {
    path: '/customers',
    route: MealRoutes
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
