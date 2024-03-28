import { NextFunction, Request, Response } from 'express'
import {Schema} from 'joi'


export const validateSchema = (schema:Schema)=>{
    return (req:Request,res:Response,next: NextFunction):void=>{
        const {error} = schema.validate(req.body)
        if (error){
            console.log('error from validate schema',error)
            const {details}=error
            const message = details?.map( (err)=> err.message.replace(/['"]+/g,'')).join(',')
            res.status(400).json({error: message})
        }
        else{
            console.log('SCHEMA VERIFIED CORRECTLY , GO TO NEXT STEP')
            next()
        }
    }
}