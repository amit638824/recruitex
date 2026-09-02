import { JobTbl } from "../entities/job";
import { AppliedJobTbl } from "../entities/applied";
import { createResponse } from "../helper/utils";
import { UserTbl } from "../entities/user";

export const getAppliedJobList = async (req: any, res: any) => {
    try {
        const recruiter_id = req.user?.id || req.user?._id;

        const db = AppliedJobTbl.createQueryBuilder('ap')
            .leftJoin(JobTbl, "job", 'job.id = ap.job_id')
            .leftJoin(UserTbl, "seeker", 'seeker.id = ap.seeker_id')
            .leftJoin(UserTbl, "rec", 'rec.id = job.recruiter_id')
            .select([
                "ap.id as applied_id",
                "ap.status as application_status",
                "ap.created_at as applied_at",
                "ap.updated_at as application_updated_at",
                "ap.job_id as job_id",
                "ap.seeker_id as seeker_id",
                "job.job_title as job_title",
                "job.category as category",
                "job.experience as experience",
                "job.job_type as job_type",
                "job.vacancies as vacancies",
                "job.job_location as job_location",
                "job.salary as salary",
                "job.status as job_status",
                "job.created_at as job_posted_at",
                "seeker.name as seeker_name",
                "seeker.email as seeker_email",
                "seeker.contact as seeker_contact",
                "seeker.location as seeker_location",
                "seeker.img as seeker_profile",
                "seeker.resume as seeker_resume",
                "seeker.qualification as seeker_qualification",
                "seeker.preference as seeker_preference",
                "rec.name as recruiter_name",
                "rec.company_logo as recruiter_logo",
            ])
            .where("job.recruiter_id = :recruiter_id", { recruiter_id })
            .orderBy("ap.created_at", "DESC");

        const result = await db.getRawMany();
        return createResponse(res, 200, true, "Applied jobs fetched successfully", result);
    } catch (err) {
        console.error("getAppliedJobList error:", err);
        return createResponse(res, 500, false, "Internal Server error", []);
    }
};

/** Update application status: hired | rejected | pending */
export const updateAppliedJobStatus = async (req: any, res: any) => {
    try {
        const recruiter_id = req.user?.id || req.user?._id;
        const appliedId = Number(req.params.id);
        const rawStatus = String(req.body?.status || '').toLowerCase().trim();

        const statusMap: Record<string, string> = {
            hired: 'hired',
            hire: 'hired',
            reject: 'rejected',
            rejected: 'rejected',
            pending: 'pending',
        };
        const status = statusMap[rawStatus];
        if (!appliedId || !status) {
            return createResponse(res, 400, false, "Valid applied id and status (hired/rejected) required", []);
        }

        const application = await AppliedJobTbl.findOne({ where: { id: appliedId } });
        if (!application) {
            return createResponse(res, 404, false, "Application not found", []);
        }

        const owned = await AppliedJobTbl.createQueryBuilder('ap')
            .leftJoin(JobTbl, 'job', 'job.id = ap.job_id')
            .where('ap.id = :appliedId', { appliedId })
            .andWhere('job.recruiter_id = :recruiter_id', { recruiter_id })
            .getCount();

        if (!owned) {
            return createResponse(res, 403, false, "Not allowed to update this application", []);
        }

        application.status = status;
        await application.save();
        return createResponse(res, 200, true, `Application marked as ${status}`, { id: appliedId, status });
    } catch (err) {
        console.error("updateAppliedJobStatus error:", err);
        return createResponse(res, 500, false, "Internal Server error", []);
    }
};
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
