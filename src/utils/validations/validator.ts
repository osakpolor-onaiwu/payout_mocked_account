import { ObjectSchema } from 'joi';
import { Custom_error } from '../errors';


export const validate_sync = (
    schema: ObjectSchema,
    payload: object
) => {
    const { value, error } = schema.validate(payload,
        {
            allowUnknown: true,
            stripUnknown: true,
            errors: {
                wrap: {
                    label: ""
                }
            }
        }
    );

    if (error) throw new Custom_error(error.message, 400);
    return value;
}