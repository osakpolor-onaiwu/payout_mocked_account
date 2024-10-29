import * as joi from 'joi';

export const generate_key_schema = joi.object({
   f4b_account_id: joi.number().required(),
   key_name: joi.string().required(),
})