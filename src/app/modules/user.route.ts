import express from 'express';
import { UserControler } from './user.controller';

const router = express.Router();

// all routes for the application

router.post('/users', UserControler.createUser);
router.get('/users', UserControler.getAllUsers);
router.get('/users/:userId', UserControler.findUserById);
router.put('/users/:userId', UserControler.updateUserInfo);
router.delete('/users/:userId', UserControler.deleteUser);
router.put('/users/:userId/orders', UserControler.newProductOder);
router.get('/users/:userId/orders', UserControler.specificUserorderList);
router.get(
  '/users/:userId/orders/total-price',
  UserControler.specificUserTotalPrice,
);

export const UserRoutes = router;
