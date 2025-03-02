const blogModel = require("../model/blog.model")
const userModel=require("../model/user.model")

class BlogControllers {
    static async deleteblog(req,res){
        try {
            await blogModel.findByIdAndDelete({_id:req.body.id.blogId})

            console.log("blog--",req.body.id.blogId,)

            res.status(200).send({message:"post deleted",status:"ok"})
            
        } catch (error) {
            console.log("blog-error-",error)
            res.status(200).send({message:"post not deleted",status:"error"})
        }
      
    }

    static async comment(req,res){
        try {
            console.log("comment--",req.body.index)
            const blogdata1 = await blogModel.findById(req.body.blogId)
            .populate("auther")
           if(req.body.index!==null){
               console.log(blogdata1.comments)
               blogdata1.comments.splice(req.body.index,1,{username:req.body.username,
                userId: req.body.userId,
                commentdata:req.body.comment})
            console.log(blogdata1.comments)
           }else{
            blogdata1.comments.push({username:req.body.username,
                userId: req.body.userId,
                commentdata:req.body.comment})
           }
           blogdata1.save()
        //    console.log(blogdata1)
            res.status(200).send({message:"comment save",status:"ok", blogdata1})
            
        } catch (error) {
            console.log("comment-error-",error)
            res.status(200).send({message:"comment not save",status:"error"})
        }
      
    }

    static async deletecomment(req,res){
        try {
            
            const blogdata1=await blogModel.findById({_id:req.body.blogId})
            const newComment=blogdata1.comments.filter((item,index)=>{
                return index!=req.body.i
            })
            const blogdata = await blogModel.findByIdAndUpdate(
                req.body.blogId, 
                 { comments: newComment } 
              , { new: true }
            ).populate('auther')
            // console.log("commentde-",newComment,blogdata)

            res.status(200).send({message:"comment save",status:"ok", blogdata})
            
        } catch (error) {
            console.log("comment-error-",error)
            res.status(200).send({message:"comment not save",status:"error"})
        }
      
    }

    static async likepost(req,res){
        try {
            
            console.log(req.body)
            const blogdata1=await blogModel.findById(req.body.blogId)
            blogdata1.likes.push(req.body.userId)
            blogdata1.save()
            // const blogdata=await blogModel.find()
            res.status(201).send({
                status:"ok"
            })
        } catch (error) {
            console.log("likepost error",error)
            res.status(404).send({status:"error"})
        }
    }

    static async dislikepost(req,res){
        try {
            
            // console.log(req.body)
            const blogdata1=await blogModel.findById(req.body.blogId)
            // blogdata1.likes.push(req.body.userId)
            const newlike=blogdata1.likes.filter((item)=>{
                console.log("o",item==req.body.userId,blogdata1.likes)
                 item!=(req.body.userid)
            })
            // console.log(newlike)
            await blogModel.findByIdAndUpdate(req.body.blogId ,{likes:newlike})
            // blogdata1.save()
            // const blogdata=await blogModel.find()
            res.status(201).send({
                status:"ok"
            })
        } catch (error) {
            console.log("likepost error",error)
            res.status(404).send({status:"error"})
        }
    }
}

module.exports=BlogControllers