import { AppliedJobTbl } from "../entities/applied";
import { JobTbl } from "../entities/job";
import { UserTbl } from "../entities/user";
import { createResponse } from "../helper/utils";

export const seekerAppliedJob = async (req: any, res: any) => {
    try {
        const seeker_id = req.user?.id || req.user?._id;
        const { job_id } = req.body;
        const isExist = await AppliedJobTbl.findOne({ where: { job_id, seeker_id } })
        if (isExist) {
            return createResponse(res, 409, false, "You already applied for this job", [])
        }
        const data = AppliedJobTbl.create({ job_id, seeker_id, status: "pending" })
        const result = await data.save()
        return createResponse(res, 201, true, "Applied successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const getSeekerAppliedJob = async (req: any, res: any) => {
    try {
        const seeker_id = req.user?.id || req.user?._id;
        const db = AppliedJobTbl.createQueryBuilder('ap')
            .leftJoin(JobTbl, "job", 'job.id=ap.job_id')
            .leftJoin(UserTbl, "user", 'user.id=ap.seeker_id')
            .leftJoin(UserTbl, "rec", 'rec.id=job.recruiter_id')
            .select([
                "ap.id as appied_id",
                "job.*",
                "user.name as seeker_name",
                "user.img as seeker_profile",
                "user.resume as seeker_resume",
                "user.qualification as seeker_qualification",
                "rec.name as recruiter_name",
                "rec.company_logo as recruiter_logo",
            ])
            .where({ seeker_id: seeker_id })
        const result = await db.getRawMany()
        return createResponse(res, 201, true, "Applied successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const seekerApplyJob = async (req: any, res: any) => {
    try {
        const seeker_id = req.user?.id || req.user?._id;
        const { job_id } = req.body;
        const isExist = await AppliedJobTbl.findOne({ where: { job_id, seeker_id } })
        if (isExist) {
            return createResponse(res, 409, false, "You already applied for this job", [])
        }
        const data = AppliedJobTbl.create({ job_id, seeker_id, status: "pending" })
        const result = await data.save()
        return createResponse(res, 201, true, "Applied successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const seekerDashboard = async (req: any, res: any) => {
    try {
        const seeker_id = req.user?.id || req.user?._id;
        const applications = await AppliedJobTbl.count({ where: { seeker_id } })
        const pending = await AppliedJobTbl.count({ where: { seeker_id, status: "pending" } })
        const hired = await AppliedJobTbl.count({ where: { seeker_id, status: "hired" } })
        const rejected = await AppliedJobTbl.count({ where: { seeker_id, status: "rejected" } })
        const recentApplied = await AppliedJobTbl.createQueryBuilder("aj")
            .leftJoin(JobTbl, "job", "job.id = aj.job_id")
            .leftJoin(UserTbl, "u", "u.id = job.recruiter_id")
            .select("aj.id", "id")
            .addSelect("aj.status", "status")
            .addSelect("aj.created_at", "applied_at")
            .addSelect("job.job_title", "job_title")
            .addSelect("job.job_location", "job_location")
            .addSelect("u.name", "recruiter_name")
            .where("aj.seeker_id = :seeker_id", { seeker_id })
            .orderBy("aj.created_at", "DESC")
            .limit(5)
            .getRawMany()
        const recommended = await JobTbl.createQueryBuilder("job")
            .where((qb) => {
                const sub = qb.subQuery()
                    .select("aj.job_id")
                    .from(AppliedJobTbl, "aj")
                    .where("aj.seeker_id = :seeker_id")
                    .getQuery()
                return "job.id NOT IN " + sub
            })
            .setParameter("seeker_id", seeker_id)
            .orderBy("job.created_at", "DESC")
            .addOrderBy("job.id", "DESC")
            .limit(5)
            .getMany()
        return createResponse(res, 200, true, "Seeker dashboard fetched successfully", {
            applications,
            pending,
            hired,
            rejected,
            recentApplied,
            recommended,
        })
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}
