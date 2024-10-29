import * as joi from 'joi';

export const login_schema = joi.object({
    f4b_account_id: joi.number().required(),
    password: joi.string().trim().required()
})