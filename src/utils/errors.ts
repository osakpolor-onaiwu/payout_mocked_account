export class ApiError extends Error {

    public readonly statusCode: number

    constructor(message : string, statusCode : number){
        super(message)
        this.statusCode = statusCode
    }
}

export class Bad_request_error extends ApiError {
    constructor(message : string) {
        super(message, 400)
    }
}

export class Not_found_error extends ApiError {
    constructor(message : string) {
        super(message, 404)
    }
}

export class Unauthorized_error extends ApiError {
    constructor(message : string) {
        super(message, 401)
    }
}

export class Custom_error extends Error{
    status_code: number;
    message: string;

    constructor(
        message?:string, status_code?:number
    ){
        super(message);
        Object.setPrototypeOf(this, Custom_error.prototype);
        this.message = message || "Please contact suppoer";
        this.status_code = status_code || 500
    }
}