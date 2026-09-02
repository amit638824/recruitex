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

/** All applications across recruiters — who applied on which job */
export const adminAppliedJobList = async (_req: any, res: any) => {
    try {
        const result = await AppliedJobTbl.createQueryBuilder('ap')
            .leftJoin(JobTbl, 'job', 'job.id = ap.job_id')
            .leftJoin(UserTbl, 'seeker', 'seeker.id = ap.seeker_id')
            .leftJoin(UserTbl, 'rec', 'rec.id = job.recruiter_id')
            .select([
                'ap.id as applied_id',
                'ap.status as application_status',
                'ap.created_at as applied_at',
                'ap.job_id as job_id',
                'ap.seeker_id as seeker_id',
                'job.job_title as job_title',
                'job.category as category',
                'job.experience as experience',
                'job.job_type as job_type',
                'job.vacancies as vacancies',
                'job.job_location as job_location',
                'job.salary as salary',
                'job.status as job_status',
                'job.created_at as job_posted_at',
                'seeker.name as seeker_name',
                'seeker.email as seeker_email',
                'seeker.contact as seeker_contact',
                'seeker.location as seeker_location',
                'seeker.img as seeker_profile',
                'seeker.resume as seeker_resume',
                'seeker.qualification as seeker_qualification',
                'seeker.preference as seeker_preference',
                'rec.name as recruiter_name',
                'rec.email as recruiter_email',
                'rec.company_logo as recruiter_logo',
            ])
            .orderBy('ap.created_at', 'DESC')
            .getRawMany()

        return createResponse(res, 200, true, 'All applied jobs fetched successfully', result)
    } catch (err) {
        console.error('adminAppliedJobList error:', err)
        return createResponse(res, 500, false, 'Internal Server error', [])
    }
}

