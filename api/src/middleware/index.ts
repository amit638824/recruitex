import jwt from 'jsonwebtoken';
import { createResponse } from '../helper/utils';

export const authMiddleware = (req: any, res: any, next: any) => {
    const token = req?.headers?.authorization?.split(" ")[1]
    if (!token) {
        return createResponse(res, 401, false, "Token is Required", [])
    }
    jwt.verify(token, `${process.env?.JWT_SCRET}`, (err: any, decode: any) => {
        if (err) {
            return createResponse(res, 401, false, "Invalid token", [])
        }
        req.user = decode;
        next()
    })
}
