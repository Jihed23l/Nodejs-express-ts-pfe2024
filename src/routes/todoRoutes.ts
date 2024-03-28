import { Router } from "express";
import { createTodo } from "../controllers/todoController";
import Joi from 'joi'
import { validateSchema } from "../middlewares/validator";

const router: Router = Router()

const createTodoSchema = Joi.object({
        title: Joi.string().required(),
        description:Joi.string().required()
})

router.post('/todos/create',validateSchema(createTodoSchema), createTodo)

export default router