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

const getCategoryContent = tryCatch(
    async(req,res)=>{
        const {name} = req.params;
        console.log(name);
        const categoryContent = await Blogcontents.findOne({name})
        if(!categoryContent){
            return res.status(StatusCodes.NOT_FOUND).json({
                msg:"Content unavailable"
            })
        }
        res.status(StatusCodes.OK).json({
            content:categoryContent
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

const getDraftContent = tryCatch(
    async(req,res)=>{
        const draftContent = await Draftcontents.find();
        if(!draftContent){
            return res.status(StatusCodes.NOT_FOUND).json({
                msg:"There are no saved drafts"
            })
        }
        res.status(StatusCodes.OK).json({
            content:draftContent
        })
    }
)


const PublishSavedDraft = tryCatch(
    async (req,res)=>{
        const {id} = req.params
       const draftContent = await Draftcontents.findOne({id})
       const publish = await Blogcontents.create({
           title:draftContent.title,
           category:draftContent.category,
           image:draftContent.image,
           content:draftContent.content,
           createdBy:draftContent.createdBy
       })
       if(!publish){
         return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"Content could not be published"
         })
       }
      const del= await Draftcontents.deleteOne({id})
      if(!del){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"couldn't delete "
        })
      }
       res.status(StatusCodes.OK).json({
         msg:"Content has been published"
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
    updateDraftContent,
    getCategoryContent,
    getDraftContent,
    PublishSavedDraft
}