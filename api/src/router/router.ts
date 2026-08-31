import express from 'express';
import { createUser, LoginUser, updateUser } from '../controller/controller';
import { authMiddleware } from '../middleware';
import { recruiterJobPost, recruiterPostedJobs } from '../controller/recruiter.controller';
const router = express.Router();
// common 
router.post("/register", createUser) //admin ko register nhi kiya jata h (manual db ) 
router.post("/login", LoginUser)
router.post("/update-profile", updateUser)
// recruiter
router.post("/recruiter-job-post", authMiddleware, recruiterJobPost)
router.get("/recruiter-posted-jobs", authMiddleware, recruiterPostedJobs)
export default router;