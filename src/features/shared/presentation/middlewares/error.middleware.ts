import { type Response, type NextFunction, type Request } from 'express';
import { HttpCode } from '../../../../core/constants';
import { AppError } from '../../../../core/errors/custom.error';

export class ErrorMiddleware {

    public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
        if (error instanceof AppError) {
            const { message, name, stack, validationErrors } = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;

            res.statusCode = statusCode;
            res.json({ name, message, validationErrors, stack });
        } else {
            const name = 'InternalServerError';
            const message = 'An internal server error occurred';
            const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
            
            res.statusCode = statusCode;
            res.json({ name, message });
        }
        next();
    };
}