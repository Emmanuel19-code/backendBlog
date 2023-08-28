require('dotenv').config()
const express = require("express");
const app = express()
const Port = 5000 || process.env.PORT
const {connection} = require("./databaseConnection/connection")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require("./ErrorHandlers/errorHandler")
const upload =require("./utils/ImageUpload")
mongoose.set('strictQuery', true);


app.use(errorHandler)

//security on packages
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')
const mongoSanitize = require("express-mongo-sanitize")


app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
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

app.post("/",(req,res)=>{
  res.json({
    msg:"hello"
  })
})



app.use(errorHandler)
app.listen(Port,()=>{
    console.log("server running on port ");
})
connection(process.env.MONGO_URI)
