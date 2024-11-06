import * as joi from 'joi';

export const update_balance_schema = joi.object({
   f4b_account_id: joi.number().required(),
   amount: joi.number().required(),
   currency: joi.string().length(3).default('NGN')
})