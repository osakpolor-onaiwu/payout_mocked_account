import * as joi from "joi";

export const fetch_detail_schema = joi.object({
  f4b_account_id: joi.number().required(),
});
