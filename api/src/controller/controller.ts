import { UserTbl } from "../entities/user";

export const createUser = async (req: any, res: any) => {
    const { type, name, email, contact, password, location, qualification } = req.body;

}
