import { Router } from 'express';
const router = Router();

import placeinfo from './placeinfo';
import token from './token';
import parking from './parking';
import barrier from './barrier';

router.use('/placeinfo', placeinfo);
router.use('/token', token);
router.use('/parking', parking);
router.use('/barrier', barrier);

export default router;
