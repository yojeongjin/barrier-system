import { Router } from 'express';
const router = Router();

// controller
import { placeList } from '../../../controller/place/placeController';

router.post('/', placeList);

export default router;
