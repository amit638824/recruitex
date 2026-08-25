import express from 'express';
import { createUser, LoginUser } from '../controller/controller'; 
const router = express.Router();
// common 
router.post("/register", createUser) //admin ko register nhi kiya jata h (manual db ) 
router.post("/login", LoginUser)
export default router;