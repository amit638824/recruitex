import { UserTbl } from "../entities/User";   
 
export const createUser = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const data: any = UserTbl.create({ name, email, password })
    const result = await data.save()
    res.send(result)
}
 