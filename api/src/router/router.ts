import express from 'express';
import { createUser, LoginUser, updateUser } from '../controller/auth.controller';
import { authMiddleware } from '../middleware';
import { recruiterJobPost, recruiterPostedJobs, recruiterDashboard } from '../controller/recruiter.controller';
import { adminPostedJobsList, adminDashboard } from '../controller/admin.controller';
import { seekerApplyJob, seekerDashboard } from '../controller/seeker.controller';
const router = express.Router();
// common 
router.post("/register", createUser) //admin ko register nhi kiya jata h (manual db ) 
router.post("/login", LoginUser)
router.post("/update-profile", updateUser)
// recruiter
router.post("/recruiter-job-post", authMiddleware, recruiterJobPost)
router.get("/recruiter-posted-jobs", authMiddleware, recruiterPostedJobs)
router.get("/recruiter-dashboard", authMiddleware, recruiterDashboard)

//admin route
router.get("/admin-posted-jobs",authMiddleware,adminPostedJobsList)
router.get("/admin-dashboard", authMiddleware, adminDashboard)
router.get("/jobs", adminPostedJobsList)
// seeker
router.post("/seeker-apply-job", authMiddleware, seekerApplyJob)
router.get("/seeker-dashboard", authMiddleware, seekerDashboard)
export default router;