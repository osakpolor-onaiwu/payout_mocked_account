import { Account } from "../../entities/accounts";
import { Request } from "express";


export interface Custom_request extends Request {
    user: Account;
}

