const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId, // Correct way to reference ObjectId
            ref: "blog", // Reference to the Blog model
        },
    ],
})

module.exports = mongoose.model("user", userSchema)