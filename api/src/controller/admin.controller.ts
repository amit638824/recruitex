import { userInfo } from "node:os";
import { JobTbl } from "../entities/job";
import { UserTbl } from "../entities/user";
import { createResponse } from "../helper/utils";

export const adminPostedJobsList = async (req: any, res: any) => {
    try {
        // const result = await JobTbl.find()
        const db = JobTbl.createQueryBuilder('job')
            .leftJoin(UserTbl, 'user', 'user.id=job.recruiter_id')
            .select([
                "job.*",
                "user.name ",
                "user.company_logo",
            ])
        const result = await db.getRawMany()
        return createResponse(res, 200, true, "Posted jobs fetched successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", err)
    }
}

