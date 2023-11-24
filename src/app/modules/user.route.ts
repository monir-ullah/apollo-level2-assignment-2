import express from 'express';
import { UserControler } from './user.controller';

const router = express.Router();

router.post('/users', UserControler.createUser);
router.get('/users', UserControler.getAllUsers);
router.get('/users/:userId', UserControler.findUserById);
router.put('/users/:userId', UserControler.updateUserInfo);

export const UserRoutes = router;
