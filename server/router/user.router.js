const express = require("express");
const router = express.Router(); 
const Controller =require("../controllers/user.controllers")
const BlogControllers=require("../controllers/blog.controllers")
// const userAuth=require("../auth/user.auth")
const blogModel=require("../model/blog.model")

// Define a route
router.get("/getblog", async(req,res)=>{
const blogdata=await blogModel.find()
.populate("auther")
 res.status(200).send({blogitem:blogdata,status:"ok"})
}) 
router.post("/login", Controller.login) 
router.post("/register", Controller.register)
router.post("/reset", Controller.resetpassword)
router.post("/blog", Controller.createblog)
router.post("/blogdata", Controller.blogdata)
router.post("/deleteblog", BlogControllers.deleteblog)
router.post("/comment", BlogControllers.comment)
router.post("/deletecomment", BlogControllers.deletecomment)
router.post("/likepost", BlogControllers.likepost)
router.post("/dislikepost", BlogControllers.dislikepost)

module.exports = router;
