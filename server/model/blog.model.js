const mongoose = require("mongoose")
const blogSchema = mongoose.Schema({
    category: String,
    tag_name: String,
    auther: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    description: String,
    image:String,
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: "user"
        }
    ],
    comments:[]

})

module.exports = mongoose.model("Blog", blogSchema)