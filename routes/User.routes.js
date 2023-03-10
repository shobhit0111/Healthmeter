const express=require("express")
const{UserModel}=require("../models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/SignUp",async(req,res)=>{
    const{email,weight,password,centimeter,height,sex,date}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"Something went wrong","error":err.message})
            }else{
                const user=new UserModel({email,weight,centimeter,height,sex,date,password:hash})
                await user.save()
                res.send({"msg":"User Registered"})
            }
        })
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await UserModel.find({email})
        const hashed_password=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hashed_password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"Login Successfully","token":token})
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    } catch (err) {
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

module.exports={
    userRouter
}