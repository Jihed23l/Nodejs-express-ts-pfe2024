import { Router } from "express";
import { createTodo, deleteOneTodoById, getAllTodos, getOneTodoById, updateOneTodoById } from "../controllers/todoController";
import Joi from 'joi'
import { validateSchema } from "../middlewares/validator";

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

router.post('/todos',validateSchema(createTodoSchema,'body'), createTodo)
router.get('/todos',getAllTodos)

router.get('/todos/:id', validateSchema(getOneTodoByIdSchema,'params'), getOneTodoById)

router.put('/todos/:id', validateSchema(getOneTodoByIdSchema,'params'),
          validateSchema(updateTodoSchema,'body'),updateOneTodoById)

router.delete('/todos/:id',validateSchema(getOneTodoByIdSchema,'params'),deleteOneTodoById)        
export default router