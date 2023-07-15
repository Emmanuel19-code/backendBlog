const express = require("express");
const app = express()
const Port = 5000 || process.env.PORT
const {connection} = require("./databaseConnection/connection")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const errorHandler = require("./ErrorHandlers/errorHandler")

mongoose.set('strictQuery', true);

//security on packages
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')
const mongoSanitize = require("express-mongo-sanitize")

app.use(errorHandler)
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json());
app.use(cookieParser())

//routes
const authRoute = require("./routes/authRoute")
const contentRoute =  require("./routes/contentRoute")

app.use("/user",authRoute)
app.use("/content",contentRoute)

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
