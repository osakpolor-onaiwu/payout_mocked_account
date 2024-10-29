import * as joi from 'joi';

export const register_schema = joi.object({
    f4b_account_id: joi.number().required(),
    business_name:joi.string().trim().required(),
    parent_account_id:joi.number().optional(),
})