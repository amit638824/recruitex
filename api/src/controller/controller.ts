import { UserTbl } from "../entities/user";
import { createResponse } from "../helper/utils";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const createUser = async (req: any, res: any) => {
    try {
        const { type, name, email, contact, password, location, qualification } = req.body;
        const isExist = await UserTbl.findOne({ where: { email } })
        if (isExist) {
            return createResponse(res, 400, false, "User already  exists", isExist)
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const data: any = UserTbl.create({ type, name, email, contact, password: hashedPass, location, qualification })
            const result = await data.save();
            return createResponse(res, 200, true, "User register successfully", result)
        }
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const LoginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const isExist = await UserTbl.findOne({ where: { email } })
        if (!isExist) {
            return createResponse(res, 400, false, "User not found", [])
        } else {
            const isMatch = await bcrypt.compare(password, isExist?.password)
            if (!isMatch) {
                return createResponse(res, 400, false, "Invalid password", [])
            } else {
                const token = await jwt.sign({ _id: isExist?.id, email: isExist?.email }, `${process.env?.JWT_SCRET}`, { expiresIn: "1d" })
                return createResponse(res, 200, true, "User  login   successfully", { ...isExist, token })
            }
        }
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}
