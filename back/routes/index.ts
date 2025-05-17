import { Router } from 'express';
const router = Router();

import v1 from './v1';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  next();
});

router.use('/v1', v1);

export default router;
