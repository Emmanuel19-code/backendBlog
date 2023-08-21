const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');



const postId=uuidv4().split('-')[0]
const ContentSchema = new mongoose.Schema({
    id:{
        type:String,
        default:postId
    },
    title:{
        type:String,
        required:[true,"please provide a title"]
    },
    category:{
        type:String,
        required:[true,"please provide a category"]
    },
    image:{
        type:Buffer
    },
    content:{
        type:String,
        required:[true,"please provide a content"]
    },
    createdBy:{
        type:String,
        required:[true,"please provide the creator"]
    }
},{timestamps:true})


module.exports = mongoose.model("Blogcontents",ContentSchema)