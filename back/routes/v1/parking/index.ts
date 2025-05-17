import { Router } from 'express';
import { tokenMiddleware } from '../../../middleware/tokenMiddleware';
import { parkingList } from '../../../controller/parking/parkingController';

const router = Router();

// controller
router.get('/', tokenMiddleware, parkingList);

export default router;
