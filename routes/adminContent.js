const express = require("express");
const { 
    PostContent, 
    updateContent,  
    DeleteContent, 
    SaveDraftContent, 
    getDraftContent, 
    PublishSavedDraft
} = require("../controllers/AdminContent");
//const { Authentication } = require("../middleware/authentication");
const { VerifyUser } = require("../middleware/authentication");
const { getDisplaycontent } = require("../controllers/UsersContent");
const router = express.Router();



router.post("/create",VerifyUser,PostContent)
router.post("/publishDraftContent:id",VerifyUser,PublishSavedDraft)
router.put("/updateContent:id",updateContent)
router.delete("/deleteContent:id",DeleteContent)
router.post("/saveToDrafts",VerifyUser,SaveDraftContent)
router.get("/draftContent",VerifyUser,getDraftContent)
router.get("/getAllcontent",VerifyUser,getDisplaycontent)


module.exports = router