const mongoose = require("mongoose")



const connection = (uri) =>{
    try {
        mongoose.connect(uri)
        console.log("connected to database");
    } catch (error) {
        console.log("Not connected to the database");
    }
}


module.exports={
    connection
}