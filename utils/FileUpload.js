const multer = require("multer");
const Path = require("path")

const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
     cb(null,'File Uploads')
   },
   filename:(req,file,cb)=>{
    cb(null,Date.now()+Path.extname(file.originalname))
   }
})


const file_upload = multer({storage:storage})


module.exports=file_upload