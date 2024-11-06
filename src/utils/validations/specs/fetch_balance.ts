import * as joi from 'joi';

export const fetch_balance_schema = joi.object({
   f4b_account_id: joi.number().required(),
   from: joi.date().iso(),
   to: joi.date().iso().default(new Date()),
   next_cursor: joi.string().base64(),
   prev_cursor: joi.string().base64(),
   id: joi.number(),
   limit: joi
      .number()
      .positive()
      .default(Number(process.env.FETCH_LIMIT) || 10)
}).oxor('next_cursor', 'prev_cursor');