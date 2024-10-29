import { Request, Response } from 'express';
import sign_in from '../../services/auth/login';
import { error_response, success_response } from '../../utils/responses/response_handler';
import { Login } from '../../services/auth/login';

const login_user = async (req: Request, res: Response) => {
    const payload = req.body;

    sign_in(payload)
        .then((response_data:Login) => {
            if(req.session){
                req.session.jwt = response_data.token;
            }

            return success_response('Login successful', response_data, res);
        })
        .catch((err:any) => {
            return error_response(err?.message, res, err?.code || 400);
        })
}

export default login_user;