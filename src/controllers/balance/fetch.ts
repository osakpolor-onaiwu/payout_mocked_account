import { Request, Response } from 'express';
import fetch from '../../services/balance/fetch';
import { error_response, success_response } from '../../utils/responses/response_handler';

const fetch_balance = async (req: Request, res: Response) => {
    const payload = req.query;
    fetch(payload)
        .then((response_data) => {
            return success_response('Balance fetched', response_data, res);
        })
        .catch((err:any) => {
            return error_response(err?.message, res, err?.code || 400);
        })
}

export default fetch_balance;