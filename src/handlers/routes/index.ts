import auth_route from './auth/index';
import extras_route from './extra/index';
import balance_route from './balance/index';
import { Router } from 'express';
const router = Router();


router.use('/auth', auth_route);
router.use('/extra', extras_route);
router.use('/balance', balance_route);

export default router;
