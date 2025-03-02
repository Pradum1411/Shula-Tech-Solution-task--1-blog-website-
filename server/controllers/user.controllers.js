const User = require("../model/user.model")
const Blog=require("../model/blog.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary").v2
const path=require("path");
const blogModel = require("../model/blog.model");
const userModel = require("../model/user.model");
cloudinary.config({
    cloud_name: process.env.YOUR_CLOUD_NAME,
    api_key: process.env.YOUR_API_KEY,
    api_secret: process.env.YOUR_API_SECRET,
})

// console.log(path.join(__dirname,"../public"))

class Controller {

    static async register(req, res) {
        try {
            // console.log("regid")
            const salt = await bcrypt.genSalt(10)
            const hashpassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashpassword
            const userData = await User(req.body)
            await userData.save()
           
            res.status(201).send({ username:userData.name, status:"ok", id:userData._id })
        } catch (error) {
            res.status(404).send({ message: "Registation Failed" })
        }
    }

    static async login(req, res) {
        try {
            console.log("login", req.body)
            const userData = await User.findOne({ email: req.body.email })
            console.log(userData)
            if (userData) {
                const isMatch = await bcrypt.compare(req.body.password, userData.password)
                if (isMatch) {
                    // req.session.userId="userData._id"
                    return res.status(201).send({username:userData.name, status: "ok" ,id:userData._id})
                } else {
                    return res.status(201).send({ message: "Wrong Credential", status: "error" })

                }

            }
            // console.log(isMatch)
            res.status(201).send({ message: "User Not Found", status: "error" })
        } catch (error) {
            console.log(error)
            res.status(404).send({ message: "Login Failed" })
        }
    }

        static async resetpassword(req,res){
            const userdata=await userModel.findOne({email:req.body.email})
            if(!userdata){
                return res.send({message:"user not Found",status:"error"})
            }
            const salt = await bcrypt.genSalt(10)
            const hashpassword = await bcrypt.hash(req.body.password, salt)
            userdata.password=hashpassword
            await userdata.save()
            return res.send({message:"Reset Password",status:"ok"})
            // console.log("rreset--",req.body,userdata)
        }

    static async createblog(req, res) {
        try {
            
            const file=req.files.file
            
           const result=await cloudinary.uploader.upload(file.tempFilePath)
            
            const blogdata=await Blog({
                auther: req.body.userid,
                category: req.body.aa,
                    tag_name: req.body.aa1,
                    description: req.body.aa2,
                    image:result.secure_url
            })
            blogdata.save()
            const userdata=await User.findById({_id:req.body.userid})
            await userdata.blog.push(blogdata._id)
            userdata.save()
            console.log(req.session.userId)
            res.status(200).send({ message: "receive", status: "ok" })
        } catch (error) {
            console.log("create blogerror--", error)
            res.status(200).send({ message: "error", status: "error" })
        }



    }

    static async blogdata(req,res){
        try {
            // console.log(req.body)
            const blogdata=await blogModel.findById({_id:req.body.id})
            .populate("auther")
            // console.log("blog--",blogdata)
            if(!blogdata){
                // console.log("blog--1")
                return res.status(404).send({message:"data not found",status:"error"})
            }
            // console.log("blog--2",blogdata.length)
            res.status(200).send({message:"data found",status:"ok" , blogdata:blogdata})
        } catch (error) {
            // console.log("blogdata error--",error)
            res.status(404).send({message:error})
        }
    }
}

module.exports = Controller