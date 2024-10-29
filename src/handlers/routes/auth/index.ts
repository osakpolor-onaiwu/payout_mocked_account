import { Router } from 'express';
import joi_schema from '../../../utils/validations/specs/index'
const routes = Router();
import { validate } from '../../../handlers/middlewares/validate_spec';
import register_user from '../../../controllers/auth/register';
import login_user from '../../../controllers/auth/login';


routes.post('/register', validate(joi_schema.register_schema), register_user);
routes.post('/login', validate(joi_schema.login_schema), login_user);

export default routes;