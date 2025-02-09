import { HttpCode } from "../constants";

export interface ValidationType {
    fields: string[];
    constraint: string;
}

interface AppErrorArgs {
    name?: string;
    statusCode: HttpCode;
    message: string;
    isOperational?: boolean;
    validationErrors?: ValidationType[];
}

export class AppError extends Error {
    public readonly name: string;
    public readonly statusCode: HttpCode;
    public readonly isOperational: boolean = true;
    public readonly validationErrors?: ValidationType[];

    constructor(args: AppErrorArgs) {
        const { message, statusCode, isOperational, name, validationErrors } = args;
    
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name ?? "Application Error";
        this.statusCode = statusCode;
        if(isOperational !== undefined) this.isOperational = isOperational;
        this.validationErrors = validationErrors;
        Error.captureStackTrace(this);
    }

    static notFound(message: string): AppError {
        return new AppError({
            name: "NotFoundError",
            message,
            statusCode: HttpCode.NOT_FOUND,
        });
    }
}