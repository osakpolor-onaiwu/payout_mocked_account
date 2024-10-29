import { Request, Response } from 'express';
import update from '../../services/balance/update';
import { error_response, success_response } from '../../utils/responses/response_handler';


const update_balance = async (req: Request, res: Response) => {

    const payload = req.body;
    update(payload)
        .then((response_data) => {
            return success_response('Balance updated', response_data, res);
        })
        .catch((err:any) => {
            return error_response(err?.message, res, err?.code || 400);
        })
}

export default update_balance;