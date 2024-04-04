import { Request, Response } from "express";
import User, { IUser } from "../database/models/User";
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import jwt from 'jsonwebtoken'

export const registerUser = async (req:Request,res:Response)=>{
    try{
        const {username,email,password} = req.body

        const existingUser = await User.findOne({email})
        if (existingUser){
            res.status(400).json({error:'email already exist! try other one'})
            return
        }

        if (req?.file){
            const file : Express.Multer.File = req?.file
            const allowedImageTypes = ['image/jpeg','image/jpg','image/png']
            if (!allowedImageTypes.includes(file?.mimetype)){
                return res.status(400).json({error:'Only png and jpg types are allowed!'})
            }
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser:IUser = new User({
            username,
            email,
            password:hashedPassword,
            profilePictureUrl:req?.file?.filename
        })

        await newUser.save()
        
        const user= await User.findById(newUser?.id)

        res.status(200).json({
            message:'User registred successfully',
            data:user
        })

    }
    catch(err){
        console.log('error',err)
        res.status(400).json({error:'❌ ERROR HAPPEN AT REGISTER USER !!! ❌'})
    }
}

export const loginUser = async (req:Request,res:Response)=>{
    try{
            const {email,password} = req.body

            const user = await User.findOne({email}).select('+password')
            if(!user){
                return res.status(400).json({error:'Invalid email or password'})
            }
            
            const isMatch=await bcrypt.compare(password,user?.password)
            if (!isMatch){
                return res.status(400).json({error:'Invalid email or password'})
            }

            const token = jwt.sign({ userId: user._id },'softyeducation' , { expiresIn: '5m' })

            res.status(200).json({message:'Logged in successfully',token})
    }
    catch(err){
        console.log('error',err)
        res.status(400).json({error:'❌ ERROR HAPPEN AT REGISTER USER !!! ❌'})
    }
}