import { NextFunction, Request, Response } from 'express';
//import logger



export const server_timeout = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent) return;;
    
    setTimeout(()=>{
        res.status(503).json({
            message:"Request timed out, please try again",
            status: "error",
            data: null
        })
    }, Number(process.env.SERVER_TIMEOUT) || 20000);
}