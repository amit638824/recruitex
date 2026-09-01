import { JobTbl } from "../entities/job";
import { AppliedJobTbl } from "../entities/applied";
import { createResponse } from "../helper/utils";
import { UserTbl } from "../entities/user";
export const getAppliedJobList = async (req: any, res: any) => {
    try {
        
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
            // .where({ seeker_id: seeker_id })
        const result = await db.getRawMany()
        return createResponse(res, 201, true, "Applied successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}
export const recruiterJobPost = async (req: any, res: any) => {
    try {
        const recruiter_id = req.user?.id || req.user?._id;
        const { category, job_title, experience, job_type, vacancies, job_location, salary } = req.body;
        const isExist = await JobTbl.findOne({ where: { recruiter_id, job_title } })
        if (isExist) {
            return createResponse(res, 409, false, `Job with ${job_title} title is already exist`, [])
        }
        const data = JobTbl.create({
            recruiter_id,
            category,
            job_title,
            experience,
            job_type,
            vacancies: Number(vacancies) || 1,
            job_location,
            salary,
            status: "pending",
        })
        const result = await data.save()
        return createResponse(res, 201, true, `Job with ${job_title} title created successfully`, result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const recruiterPostedJobs = async (req: any, res: any) => {
    try {
        const recruiter_id = req.user?.id || req.user?._id;
        const result = await JobTbl.find({
            where: { recruiter_id },
            order: { created_at: "DESC", id: "DESC" },
        })
        return createResponse(res, 200, true, "Posted jobs fetched successfully", result)
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}

export const recruiterDashboard = async (req: any, res: any) => {
    try {
        const recruiter_id = req.user?.id || req.user?._id;
        const jobsPosted = await JobTbl.count({ where: { recruiter_id } })
        const applications = await AppliedJobTbl.createQueryBuilder("aj")
            .leftJoin(JobTbl, "job", "job.id = aj.job_id")
            .where("job.recruiter_id = :recruiter_id", { recruiter_id })
            .getCount()
        const hired = await AppliedJobTbl.createQueryBuilder("aj")
            .leftJoin(JobTbl, "job", "job.id = aj.job_id")
            .where("job.recruiter_id = :recruiter_id", { recruiter_id })
            .andWhere("LOWER(aj.status) = :status", { status: "hired" })
            .getCount()
        const pending = await AppliedJobTbl.createQueryBuilder("aj")
            .leftJoin(JobTbl, "job", "job.id = aj.job_id")
            .where("job.recruiter_id = :recruiter_id", { recruiter_id })
            .andWhere("LOWER(aj.status) = :status", { status: "pending" })
            .getCount()
        const latestJobs = await JobTbl.find({
            where: { recruiter_id },
            order: { created_at: "DESC", id: "DESC" },
            take: 5,
        })
        return createResponse(res, 200, true, "Recruiter dashboard fetched successfully", {
            jobsPosted,
            applications,
            hired,
            pending,
            latestJobs,
        })
    } catch (err) {
        return createResponse(res, 500, false, "Internal Server error", [])
    }
}
