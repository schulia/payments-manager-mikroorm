import { Router } from 'express';
import * as payoutController from '../controllers/payouts';

const router = Router();

router.get('/:id', payoutController.getPayoutById);
router.post('/', payoutController.createPayout);
router.get('/users/:userId', payoutController.getPayoutByUserId);
router.get('/transaction/:transactionId', payoutController.getPayoutByTransactionId);

export default router;