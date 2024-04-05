import { Router } from "express";
import { createTodo, deleteOneTodoById, getAllTodos, getMyTodos, getOneTodoById, updateOneTodoById } from "../controllers/todoController";
import Joi from 'joi'
import { validateSchema } from "../middlewares/validator";
import {verifyToken } from "../helpers/authMiddleware";

const router: Router = Router()

const createTodoSchema = Joi.object({
        title: Joi.string().required(),
        description:Joi.string().required()
})

const updateTodoSchema=Joi.object({
        title:Joi.string(),
        description:Joi.string()
})

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('invalid todo id')
const getOneTodoByIdSchema=Joi.object({ id : idSchema})

router.post('/todos',verifyToken, validateSchema(createTodoSchema,'body'), createTodo)

router.get('/todos',verifyToken,getAllTodos)

router.get('/todos/my',verifyToken, getMyTodos)

router.get('/todos/:id', verifyToken, validateSchema(getOneTodoByIdSchema,'params'), getOneTodoById)

router.put('/todos/:id', verifyToken, validateSchema(getOneTodoByIdSchema,'params'),
          validateSchema(updateTodoSchema,'body'),updateOneTodoById)

router.delete('/todos/:id',verifyToken, validateSchema(getOneTodoByIdSchema,'params'),deleteOneTodoById)        
export default router