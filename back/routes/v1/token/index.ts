import { Router } from 'express';
const router = Router();

// controller
import { createToken } from '../../../controller/token/tokenController';

router.post('/', createToken);

export default router;
