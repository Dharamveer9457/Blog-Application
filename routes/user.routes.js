const express = require("express")
const {userModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const {tracker} = require("../middlewares/tracker")

//register Route for User
userRouter.post("/register",tracker , async(req,res)=>{
    const {name,email,password,city,age} = req.body
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(500).json({"msg":"user already exists!!"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log({"msg":"Something went wrong while registering","err":err.message})
                }else{
                    const user = new userModel({name,email,password:hash,city,age})
                    await user.save()
                    res.status(200).json({"msg":"New user has been registered"})
                }
              })
        }
       
    } catch (error) {
        res.status(500).json({"err":error.message})
    }
})



//login route for users
userRouter.post("/login",tracker, async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id},"blog")
                    res.status(200).json({"msg":"Login Successfull", "token":token})
                }else{
                    res.status(500).json({"msg":"Wrong Credentials"})
                }
            })
        }else{
            res.status(500).json({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        res.status(500).json({"err":error.message})
    }
})



module.exports = {
    userRouter
}