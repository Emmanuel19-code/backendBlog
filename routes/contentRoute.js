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
const { VerifyUser } = require("../middleware/authentication");
const router = express.Router();







router.post("/create",VerifyUser,PostContent)
router.post("/publishDraftContent:id",VerifyUser,PublishSavedDraft)
router.put("/updateContent:id",updateContent)
router.get("/getContent:id",SpecifiedContent)
router.delete("/deleteContent:id",DeleteContent)
router.post("/saveToDrafts",VerifyUser,SaveDraftContent)
router.get("/getCategoryContent:name",getCategoryContent)//This route is for user 
router.get("/draftContent",VerifyUser,getDraftContent)


module.exports = router