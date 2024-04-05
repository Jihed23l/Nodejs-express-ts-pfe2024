import {Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from "../database/models/User";

export interface AuthRequest extends Request{
    userId?:string
}

export const verifyToken = (req: AuthRequest,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization

    if (!token){
        return res.status(400).json({error:'Access denied. Token not provided'})
    }

    try{
        const decoded = jwt.verify(token.split(' ')[1],'softyeducation') as {userId :string}
        req.userId = decoded.userId
    }
    catch(err){
        console.log(err)
       return  res.status(400).json({error:'Access denied.Invalid Token'})
    }
    next()
}

