import { NextFunction, Response, Request } from 'express';
import { ObjectSchema } from 'joi';
import { validate_sync } from '../../utils/validations/validator';
import { error_response } from '../../utils/responses/response_handler';


export const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): ReturnType<typeof next> | ReturnType<typeof res.send> => {
        try {
            const validated = validate_sync(schema, { ...req.body, ...req.query });
            req.body = validated;
            return next();
        } catch (error: any) {
            return error_response(error?.message, res, error?.code || 400);
        }
    }
}