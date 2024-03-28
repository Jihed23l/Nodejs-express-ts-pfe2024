import {Request , Response} from 'express'
import Todo, { ITodo } from '../database/models/Todo'

export const createTodo = async (req:Request,res:Response): Promise<void>=>{
    try{
        console.log('WELCOME TO CREATE TODO CONTROLLER ')
        const {title,description}=req.body

        const newTodo :ITodo = new Todo(
            {
                title,
                description
            }
        )
        const savedTodo:ITodo = await newTodo.save()
        res.status(200).json({
            message:'Todo Created Successfully',
            data:savedTodo
        })
    }
    catch(error){
        res.status(400).json({
            error: '❌ ERROR HAPPEN AT CREATE TODO!!! ❌ '
        })
    }
}