import { User } from "../models/user.js"
import ErrorHandler from "../middleware/error.js";

import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js"




export const registerUser = async(req, res,next) => {
    try {
        const {name,email,password} = req.body

    let user = await User.findOne({email})

    if(user) return next(new ErrorHandler('user already exist',404))
    
    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    sendCookie(user,res,"user created",201)
    } catch (error) {
        next(error)
    }
}

export const loginUser = async(req, res, next) => {
    try {
        const {email,password}= req.body

    const user = await User.findOne({email}).select("+password") // because we use select false in password field in models

    if(!user) return next(new ErrorHandler('first register',404))
    
    
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){  
        return next(new ErrorHandler('Invalid email or password',404))
    }
    sendCookie(user,res,`welcome back, ${user.name}`,201)
    } catch (error) {
        next(error)
    }
}


export const getMyProfile = (req, res) => {

    try {
        res.status(200).json({
            success: true,
            user:req.user,
        })
    } catch (error) {
        next(error)
    }
}


export const logoutUser=(req,res)=>{
    try {
        res.status(200).cookie("token","",{
            expires: new Date(Date.now()),
            sameSite:process.env.NODE_ENV === 'DEVELOPMENT'?"lax":"none",
            secure:process.env.NODE_ENV === 'DEVELOPMENT'?false: true,
        }).json({
            success: true,
            message:"logout successfully"
        })
    } catch (error) {
        next(error)
    }
}
