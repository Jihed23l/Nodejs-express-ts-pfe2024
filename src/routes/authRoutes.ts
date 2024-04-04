import { Router } from "express";
import {  loginUser, registerUser } from "../controllers/userController";
import upload from "../utils/multerConfig";
import Joi from 'joi'
import { validateSchema } from "../middlewares/validator";

const router: Router = Router()

const registerSchema=Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})

router.post('/register',upload.single('profilePictureUrl'),validateSchema(registerSchema,'body'),registerUser)

router.post('/login',validateSchema(loginSchema,'body'),loginUser)
export default router