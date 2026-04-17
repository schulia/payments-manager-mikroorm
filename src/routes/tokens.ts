import { Router } from 'express';
import * as tokenController from '../controllers/token.js';

const router = Router();

router.get('/:id', tokenController.getOcpiTokens);
router.get('/user/:email', tokenController.getOcpiTokensByUserEmail);

export default router;