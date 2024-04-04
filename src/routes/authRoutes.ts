import { Router } from "express";
import {  registerUser } from "../controllers/userController";

const router: Router = Router()

router.post('/register',registerUser)

export default router