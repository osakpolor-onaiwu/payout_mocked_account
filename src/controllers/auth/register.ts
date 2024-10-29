import { Request, Response } from 'express';
import register from '../../services/auth/register';
import { error_response, success_response } from '../../utils/responses/response_handler';


const register_user = async (req: Request, res: Response) => {
    const payload = req.body;
    register(payload)
        .then(response_data => {
            return success_response('registration successful', response_data, res)
        })
        .catch((err:any) => {
            return error_response(err?.message, res, err?.code || 400)
        })
}

export default register_user;