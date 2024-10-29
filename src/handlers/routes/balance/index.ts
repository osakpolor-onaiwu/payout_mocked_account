import { Router } from 'express';
import joi_schema from '../../../utils/validations/specs/index'
const routes = Router();
import { validate } from '../../middlewares/validate_spec';
import fetch_balance from '../../../controllers/balance/fetch';
import update_balance from '../../../controllers/balance/update';
import { is_authenticated_middleware } from '../../middlewares';

routes.get('/fetch', is_authenticated_middleware, validate(joi_schema.fetch_balance_schema), fetch_balance);
routes.post('/update', is_authenticated_middleware, validate(joi_schema.update_balance_schema), update_balance);

export default routes
