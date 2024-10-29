import { Request, Response } from 'express';
import fetch_merchant_detail from '../../services/extras/fetch_account_details';
import { error_response, success_response } from '../../utils/responses/response_handler';


const fetch_details = async (req: Request, res: Response) => {
    const payload = req.query;
    fetch_merchant_detail(payload)
        .then((response_data:any) => {
            return success_response('Merchant details fetched', response_data, res)
        })
        .catch((err:any) => {
            return error_response(err?.message, res, err?.code)
        })
}

export default fetch_details;