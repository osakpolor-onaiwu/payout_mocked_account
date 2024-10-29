import { Router } from 'express';
import joi_schema from '../../../utils/validations/specs/index'
const routes = Router();
import { validate } from '../../middlewares/validate_spec';
import generate_secret_key from '../../../controllers/extra/generate_key';
import fetch_merchant_details from '../../../controllers/extra/fetch_merchant_details';


routes.post('/generate_key', validate(joi_schema.generate_key_schema), generate_secret_key);
routes.get('/fetch_merchant_details', validate(joi_schema.fetch_detail_schema), fetch_merchant_details);

export default routes
