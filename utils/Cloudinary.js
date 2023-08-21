const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: `${process.env.cloud_name}`,
  api_key:`${process.env.cloudinaryApikey}`,
  api_secret: `${process.env.cloudinaryApisecret}`,
  secure: true,
});

//cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//  { public_id: "olympic_flag" }, 
//  function(error, result) {console.log(result); });


  module.exports=cloudinary