const express = require("express");
const { 
    PostContent, 
    updateContent, 
    SpecifiedContent, 
    DeleteContent, 
    SaveDraftContent, 
    getCategoryContent, 
    getDraftContent, 
    PublishSavedDraft
} = require("../controllers/ContentCreate");
const { Authentication } = require("../middleware/authentication");
const router = express.Router();







router.post("/create",Authentication,PostContent)
router.post("/publishDraftContent:id",Authentication,PublishSavedDraft)
router.put("/updateContent:id",Authentication,updateContent)
router.get("/getContent:id",Authentication,SpecifiedContent)
router.delete("/deleteContent:id",Authentication,DeleteContent)
router.post("/saveToDrafts",Authentication,SaveDraftContent)
router.get("/getCategoryContent:name",getCategoryContent)//This route is for user 
router.get("/draftContent",Authentication,getDraftContent)


module.exports = router