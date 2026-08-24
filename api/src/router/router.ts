import express from 'express';
import { createUser } from '../controller/controller'; 
const router = express.Router();
router.post("/create", createUser) 
export default router;