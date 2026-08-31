import { UserTbl } from "../entities/user";
import { createResponse } from "../helper/utils";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import path from "path";
import fs from "fs";
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
                const token = await jwt.sign({ id: isExist?.id, email: isExist?.email }, `${process.env?.JWT_SCRET}`, { expiresIn: "1d" })
                return createResponse(res, 200, true, "User  login   successfully", { ...isExist, token })
            }
        }
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const updateUser = async (req: any, res: any) => {
    try {
        const { id, name, email, contact, location, qualification, preference, password } = req.body;
        const userId = Number(id)
        const user = await UserTbl.findOne({ where: { id: userId } })
        if (!user) {
            return createResponse(res, 400, false, "User not found", [])
        }
        if (email && email !== user.email) {
            const emailTaken = await UserTbl.findOne({ where: { email } })
            if (emailTaken) {
                return createResponse(res, 400, false, "Email already exists", [])
            }
        }
        const updateData: any = { name, email, contact, location, qualification, preference }
        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }
        const uploadDir = path.join(process.cwd(), "upload");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const files: any = req.files || {}
        if (files.img) {
            const ext = path.extname(files.img.name || "");
            const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
            await files.img.mv(path.join(uploadDir, filename));
            updateData.img = filename;
        }
        if (files.company_logo) {
            const ext = path.extname(files.company_logo.name || "");
            const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
            await files.company_logo.mv(path.join(uploadDir, filename));
            updateData.company_logo = filename;
        }
        if (files.resume) {
            const ext = path.extname(files.resume.name || "");
            const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
            await files.resume.mv(path.join(uploadDir, filename));
            updateData.resume = filename;
        }
        await UserTbl.update({ id: userId }, updateData)
        const result = await UserTbl.findOne({ where: { id: userId } })
        return createResponse(res, 200, true, "Profile updated successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}
