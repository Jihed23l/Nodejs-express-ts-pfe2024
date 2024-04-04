import {Request , Response} from 'express'
import Todo, { ITodo } from '../database/models/Todo'
import APIFeatures from '../helpers/apiFeatures'

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

export const getOneTodoById = async (req:Request,res:Response):Promise<void>=>{
        try{
            const {id}= req.params
            const todo :ITodo | null= await Todo.findById(id)
            if (!todo){
                res.status(404).json({error:'Todo not found! ❌'})
                return
            }
            res.status(200).json({message:'Todo returned successfully',todo})
        }
        catch(error){
            res.status(400).json({
                error: '❌ ERROR HAPPEN AT GET ONE TODO BY ID!!! ❌ '
            })
        }
}

export const updateOneTodoById= async (req:Request,res:Response):Promise<void>=>{
    try{
        const {id}=req.params
        const data=req.body

        if (Object.values(req.body).length === 0){
            res.status(200).json({message:'nothing to update'})
            return
        }

        const updatedTodo= await Todo.findByIdAndUpdate(id,data)
        if (!updatedTodo){
            res.status(404).json({error:'Todo not found'})
            return
        }

        res.status(200).json({message:'Todo updated successfully',todo:updatedTodo})
    }
    catch(error){
        res.status(400).json({
            error: '❌ ERROR HAPPEN AT UPDATE ONE TODO BY ID!!! ❌ '
        })
    }
}

export const deleteOneTodoById= async (req:Request,res:Response):Promise<void>=>{
    try{
        const {id}=req.params
        await Todo.findByIdAndUpdate(id,{deletedAt:new Date()})
        res.status(200).json({message:'Todo deleted successfully'})
    }
    catch(error){
        res.status(400).json({
            error: '❌ ERROR HAPPEN AT DELETE ONE TODO BY ID!!! ❌ '
        })
    }
}

export const getAllTodos = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {page = 1 ,limit = 10}=req.query
        const options={
            page:parseInt(page as string),
            limit:parseInt(limit as string)
        }

        let findAllQuery = Todo.find()

        const features = new APIFeatures(
            findAllQuery,
            req.query
        )
        .filter()
        .sort()
        .limitFields()
        .search(['title','description'])

        const paginatedTodos = await Todo.paginate(features?.query,options)
        res.status(200).json({message:'All todos returned successfully',paginatedTodos})
    }
    catch(err){
        res.status(400).json({
            error: '❌ ERROR HAPPEN AT GET ALL TODOS !!! ❌ '
        })
    }
}