import { Router } from 'express';
import { tokenMiddleware } from '../../../middleware/tokenMiddleware';
import { openBarrier } from '../../../controller/barrier/barrierController';

const router = Router();

// controller
router.post('/', tokenMiddleware, openBarrier);

export default router;
