import { Response } from 'express';



const responder = (
    status: string,
    message: string,
    data: object | object[] | null,
    res: Response,
    code?: number
) => {
    if (code) res.status(code);

    return res.json({
        status,
        message,
        data,
        code
    });
}

export const success_response = (
    message: string,
    data: object | null | object[],
    res: Response
) => {
    return responder('Success', message, data, res);
}


export const error_response = (
    message: string,
    res: Response,
    code?: number
) => {
    return responder('Error', message, null, res, code)
}

