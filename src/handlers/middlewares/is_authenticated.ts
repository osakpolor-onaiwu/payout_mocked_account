import { NextFunction, Request, Response } from "express";
import { Custom_request } from "../../utils/types_and_interfaces/interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { error_response } from "../../utils/responses/response_handler";
import { models } from '../../entities/index';
import query_db from '../../utils/abstractions/db_abstraction';
import { ObjectLiteral } from "typeorm";
import { getClientIp as get_client_ip } from 'request-ip';
import { Bad_request_error } from "../../utils/errors";

export const is_authenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req?.session?.jwt!) {
            const validated_token = jwt.verify(
                req.session.jwt,
                process.env.JWT_SECRET || "dsdsdfd",
            ) as JwtPayload;

            if (!validated_token) throw new Error("User not Authorized");

            const user: ObjectLiteral | null = await query_db(models.Account).find_one({
                id: validated_token.id,
                deleted_at: null
            });

            if (!user) throw new Error("User not Authenticated");

            if (user?.f4b_account_id) {
                req.body.f4b_account_id = user.f4b_account_id;
                req.query.f4b_account_id = user.f4b_account_id as unknown as string;
                req.body.ip_address = get_client_ip(req);
                req.body.user_agent = req.headers['user-agent'];
            }
        
        }else{
            throw new Bad_request_error('user not authenticated');
        }

        return next();
    } catch (error: any) {
        return error_response(error.message, res);
    }
}
