const express = require("express");
const {  
    SpecifiedContent,  
    getCategoryContent,
    getDisplaycontent, 
} = require("../controllers/UsersContent");
const router = express.Router();






router.get("/getAllcontent",getDisplaycontent)
router.get("/getContent:id",SpecifiedContent)
router.get("/getCategoryContent:name",getCategoryContent)



module.exports = router