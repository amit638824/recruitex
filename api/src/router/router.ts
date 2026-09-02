import express from 'express';
import { createUser, LoginUser, updateUser } from '../controller/auth.controller';
import { authMiddleware } from '../middleware';
import { recruiterJobPost, recruiterPostedJobs, recruiterDashboard, getAppliedJobList, updateAppliedJobStatus } from '../controller/recruiter.controller';
import { adminPostedJobsList, adminDashboard, adminSeekerList, adminRecruiterList, adminAppliedJobList } from '../controller/admin.controller';
import { getSeekerAppliedJob, seekerAppliedJob, seekerApplyJob, seekerDashboard } from '../controller/seeker.controller';
const router = express.Router();
// common 
router.post("/register", createUser) //admin ko register nhi kiya jata h (manual db ) 
router.post("/login", LoginUser)
router.post("/update-profile", updateUser)
// recruiter
router.post("/recruiter-job-post", authMiddleware, recruiterJobPost)
router.get("/recruiter-posted-jobs", authMiddleware, recruiterPostedJobs)
router.get("/recruiter-dashboard", authMiddleware, recruiterDashboard)
router.get("/recruiter-applied-job", authMiddleware, getAppliedJobList)
router.patch("/recruiter-applied-job/:id/status", authMiddleware, updateAppliedJobStatus)
//admin route
router.get("/admin-posted-jobs",authMiddleware,adminPostedJobsList)
router.get("/admin-dashboard", authMiddleware, adminDashboard)
router.get("/admin-seeker-list", authMiddleware, adminSeekerList)
router.get("/admin-recruiter-list", authMiddleware, adminRecruiterList)
router.get("/admin-applied-job", authMiddleware, adminAppliedJobList)
router.get("/jobs", adminPostedJobsList)
// seeker
router.post("/seeker-apply-job", authMiddleware, seekerApplyJob)
router.get("/seeker-dashboard", authMiddleware, seekerDashboard)
router.post("/seeker-applied-job", authMiddleware, seekerAppliedJob)
router.get("/seeker-applied-job", authMiddleware, getSeekerAppliedJob)
export default router;
 