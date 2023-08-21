const Blogcontents = require("../models/ContentSchema")
const tryCatch = require("../ErrorHandlers/TryCatch");
const { StatusCodes } = require('http-status-codes');





const getDisplaycontent = tryCatch(
    async (req,res)=>{
        const content = await Blogcontents.find();
        if(!content){
            res.status(StatusCodes.NOT_FOUND).json({
                msg:"Please refresh your browser in a few minutes"
            })
        }
        res.status(StatusCodes.OK).json({
            content:content
        })
    }
)

const SpecifiedContent = tryCatch(
    async (req,res)=>{
        const {id} = req.params
        const findContent = await Blogcontents.findOne({id:id}).sort()
        if(!findContent){
            return res.status(StatusCodes.NOT_FOUND).json({
                msg:"Content is no more available"
            })
        }
        res.status(StatusCodes.OK).json({
            content:findContent
        })
    }
)

const getCategoryContent = tryCatch(
    async(req,res)=>{
        const {name} = req.params;
        const categoryContent = await Blogcontents.find({name})
        if(!categoryContent){
            return res.status(StatusCodes.NOT_FOUND).json({
                msg:"Sorry No contents can be found Please refresh the page in a few minutes"
            })
        }
        
        res.status(StatusCodes.OK).json({
            content:categoryContent
        })
    }
)











module.exports ={
    SpecifiedContent,
    getCategoryContent,
    getDisplaycontent
}