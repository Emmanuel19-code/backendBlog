const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');



const draftId=uuidv4().split('-')[0]
const DraftSchema = new mongoose.Schema({
    Id:{
        type:String,
        default:draftId
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
        type:String
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


module.exports = mongoose.model("Draftcontents",DraftSchema)