const express = require("express");
const { PostContent, updateContent, SpecifiedContent, DeleteContent, SaveDraftContent } = require("../controllers/ContentCreate");
const { Authentication } = require("../middleware/authentication");
const router = express.Router();







router.post("/create",Authentication,PostContent)
router.put("/updateContent:id",Authentication,updateContent)
router.get("/getContent:id",Authentication,SpecifiedContent)
router.delete("/deleteContent",Authentication,DeleteContent)
router.post("/saveToDrafts",Authentication,SaveDraftContent)


module.exports = router