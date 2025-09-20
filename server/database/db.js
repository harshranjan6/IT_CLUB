const mongoose = require("mongoose")


const db = async () =>{
    try{
         await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/IT_CLUB")
         console.log("Database is connected")
    }catch(err){
        console.error("Database is not connect",err.message)
        process.exit(1)
    }
   
    
}
module.exports = db;

