import { Router } from 'express';
import { UserRoutes } from '../modules/user/user-route';
import { MealRoutes } from '../modules/meal/meal-route';
import { CustomerMealRoutes } from '../modules/Customer_meals/customer-route';
import { OrderRoutes } from '../modules/order/order.route';
import { CuponRoutes } from '../modules/Cupon_graph/cupon_route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes
  },
  {
    path: '/providers',
    route: MealRoutes
  },
  {
    path: '/customers',
    route: CustomerMealRoutes
  },
  {
    path: '/customers',
    route: CustomerMealRoutes
  },
  {
    path: '/payment',
    route: OrderRoutes
  },
  {
    path: '/cupon',
    route: CuponRoutes
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
