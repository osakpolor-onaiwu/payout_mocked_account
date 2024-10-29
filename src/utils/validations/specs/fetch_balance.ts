import * as joi from 'joi';

export const fetch_balance_schema = joi.object({
   f4b_account_id: joi.number().required(),
   from: joi.date().iso(),
   to: joi.date().iso(),
})