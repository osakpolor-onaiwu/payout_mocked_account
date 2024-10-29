import { NextFunction, Request, Response } from 'express';
//import logger

export const error_handler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent) next(err);
    let validation_error: Record<string,string> = {};
    let status_code: number = 500;

    validation_error["status"] = "error";
    validation_error["message"] = "An error occurred, Please contact support"

    return res.status(status_code).send(validation_error);
}