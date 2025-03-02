const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const cors = require("cors")
const userRouter = require("./router/user.router")
const mongoose = require("mongoose")
const session = require("express-session")
const path = require("path")
const fileupload=require("express-fileupload")
const app = express()
const corsOption = {
    "origin": "http://localhost:5173",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))



app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/public/images/'
}))
app.use(session({
    secret: 'your_secret_key', // Change this to a secure, random string
    resave: false,
    saveUninitialized: false,
   
}));
const port = process.env.PORT || 8000
console.log(process.env.PORT)
app.use("/user", userRouter)

mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => {
        console.log("database connected")

    })


app.listen(port, () => {
    console.log(`server run at port --${port}`)
})