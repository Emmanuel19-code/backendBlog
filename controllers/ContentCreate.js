const Blogcontents = require("../models/ContentSchema")
const tryCatch = require("../ErrorHandlers/TryCatch");
const { StatusCodes } = require('http-status-codes');
const Draftcontents = require("../models/DraftSchema")


const PostContent = tryCatch(
    async (req,res)=>{
        const {title,image,category,content} = req.body;
        const username = req.user.username
        if(!title || !category || !content){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please provide the missing field"
            })
        }
        const createContent = await Blogcontents.create({
            title:title,
            image:image,
            category:category,
            content:content,
            createdBy:username
        })
        if(!createContent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Content could not be published try again"
            })
        }
        res.status(StatusCodes.CREATED).json({
            msg:"You content has been uploaded"
        })
    }
)


const updateContent = tryCatch(
    async (req,res)=>{
        const {update} = req.body
        const {id} = req.params
        if(!update){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please field can't be empty"
            })
        }
        const findContent = await Blogcontents.findOne({id})
        findContent.content = update
        findContent.save()
        res.status(StatusCodes.OK).json({
            msg:"Your content has been updated"
        })
    }
)

const SpecifiedContent = tryCatch(
    async (req,res)=>{
        const {id} = req.params
        const findContent = await Blogcontents.findOne({id})
        if(!findContent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Contents is no more available"
            })
        }
        res.status(StatusCodes.OK).json({
            content:findContent
        })
    }
)


const DeleteContent = tryCatch(
    async (req,res)=>{
        const {id} = req.params
        const findContent = await Blogcontents.findOne({id})
        if(!findContent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Content cannot be found"
            })
        }
        const delcontent = await Blogcontents.deleteOne({id})
        if(!delcontent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Could not delete content"
            })
        }
    }
)


const SaveDraftContent = tryCatch(
    async (req,res)=>{
        const {title,image,category,content} = req.body;
        const username = req.user.username
        if(!title || !category || !content){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please provide the missing field"
            })
        }
        const saveContent = await Draftcontents.create({
            title:title,
            image:image,
            category:category,
            content:content,
            createdBy:username
        })
        if(!saveContent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Content could not be saved in draft please try again"
            })
        }
        res.status(StatusCodes.OK).json({
            msg:"Contents have been saved in the draft"
        })
    }
)

const DeleteDraftContent = tryCatch(
    async (req,res)=>{
        const {id} = req.params
        const findContent = await Draftcontents.findOne({id})
        if(!findContent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Content cannot be found"
            })
        }
        const delcontent = await Draftcontents.deleteOne({id})
        if(!delcontent){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Could not delete content"
            })
        }
    }
)

const updateDraftContent = tryCatch(
    async (req,res)=>{
        const {update} = req.body
        const {id} = req.params
        if(!update){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please field can't be empty"
            })
        }
        const findContent = await Draftcontents.findOne({id})
        findContent.content = update
        findContent.save()
        res.status(StatusCodes.OK).json({
            msg:"Your content has been updated"
        })
    }
)

module.exports ={
    PostContent,
    updateContent,
    SpecifiedContent,
    DeleteContent,
    SaveDraftContent,
    DeleteDraftContent,
    updateDraftContent
}