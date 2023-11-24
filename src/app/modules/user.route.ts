import express from 'express';
import { UserControler } from './user.controller';

const router = express.Router();

router.post('/users', UserControler.createUser);
router.get('/users', UserControler.getAllUsers);
router.get('/users/:userId', UserControler.findUserById);

export const UserRoutes = router;
