require('dotenv').config()
const express = require("express");
const app = express()
const Port = 5000 || process.env.PORT
const {connection} = require("./databaseConnection/connection")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require("./ErrorHandlers/errorHandler")

mongoose.set('strictQuery', true);


app.use(errorHandler)

//security on packages
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')
const mongoSanitize = require("express-mongo-sanitize")


app.use(cors({
  orign:["http://localhost:3000"],
  methods:["POST,GET,PUT"],
  credentials:true
}))
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json());
app.use(cookieParser())

//routes
const authRoute = require("./routes/authRoute")
const usercontentRoute =  require("./routes/userscontentRoute")
const admincontentRoute = require("./routes/adminContent")

app.use("/user",authRoute)
app.use("/content",usercontentRoute)
app.use("/admin",admincontentRoute)

app.get("/",(req,res)=>{
  res.json({
    msg:"hello"
  })
})



app.use(errorHandler)
app.listen(Port,()=>{
    console.log("server running on port ");
})
connection(process.env.MONGO_URI)
