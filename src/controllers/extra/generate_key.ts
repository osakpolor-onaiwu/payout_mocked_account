import { Request, Response } from 'express';
import generate_key from '../../services/extras/generate_secret_keys';
import { error_response, success_response } from '../../utils/responses/response_handler';


const generate_secret_key = async (req: Request, res: Response) => {
    const payload = req.body;
    generate_key(payload)
        .then((response_data:any) => {
            return success_response('', response_data, res)
        })
        .catch((err:any) => {
            return error_response(err?.message, res, err?.code)
        })
}

export default generate_secret_key;