import { Request, Response } from "express";
import User, { IUser } from "../database/models/User";
import bcrypt from 'bcryptjs'

export const registerUser = async (req:Request,res:Response)=>{
    try{
        const {username,email,password} = req.body

        const existingUser = await User.findOne({email})
        if (existingUser){
            res.status(400).json({error:'email already exist! try other one'})
            return
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser:IUser = new User({
            username,
            email,
            password:hashedPassword,
            profilePictureUrl:req?.file?.filename
        })

        await newUser.save()
 
        res.status(200).json({
            message:'User registred successfully',
            data:newUser
        })

    }
    catch(err){
        console.log('error',err)
        res.status(400).json({error:'❌ ERROR HAPPEN AT REGISTER USER !!! ❌'})
    }
}
