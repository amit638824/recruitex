import express from 'express';
import { createUser } from '../controller/controller'; 
const router = express.Router();
// common
router.post("/register", createUser) //admin ko register nhi kiya jata h (manual db )
export default router;