import { Router } from 'express';
import * as userController from '../controllers/users';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
// router.get('/:userId/balance', userController.getUserBalance);

export default router;