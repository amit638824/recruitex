import { JobTbl } from "../entities/job";
import { UserTbl } from "../entities/user";
import { AppliedJobTbl } from "../entities/applied";
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
            .orderBy("job.created_at", "DESC")
            .addOrderBy("job.id", "DESC")
        const result = await db.getRawMany()
        return createResponse(res, 200, true, "Posted jobs fetched successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", err)
    }
}

export const adminSeekerList = async (_req: any, res: any) => {
    try {
        const result = await UserTbl.find({
            where: { type: "seeker" },
            select: ["id", "name", "email", "contact", "location", "img", "qualification", "preference", "resume", "status", "created_at"],
            order: { created_at: "DESC" },
        })
        return createResponse(res, 200, true, "Seeker list fetched successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", err)
    }
}

export const adminRecruiterList = async (_req: any, res: any) => {
    try {
        const result = await UserTbl.find({
            where: { type: "recruiter" },
            select: ["id", "name", "email", "contact", "location", "img", "company_logo", "status", "created_at"],
            order: { created_at: "DESC" },
        })
        return createResponse(res, 200, true, "Recruiter list fetched successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", err)
    }
}

export const adminDashboard = async (_req: any, res: any) => {
    try {
        const seekers = await UserTbl.count({ where: { type: "seeker" } })
        const recruiters = await UserTbl.count({ where: { type: "recruiter" } })
        const jobs = await JobTbl.count()
        const applications = await AppliedJobTbl.count()
        const pendingJobs = await JobTbl.count({ where: { status: "pending" } })
        const recentJobs = await JobTbl.find({ order: { created_at: "DESC", id: "DESC" }, take: 5 })
        return createResponse(res, 200, true, "Admin dashboard fetched successfully", {
            seekers,
            recruiters,
            jobs,
            applications,
            pendingJobs,
            recentJobs,
        })
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

