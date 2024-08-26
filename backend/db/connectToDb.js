const conf = require("../conf/conf")
const mongoose = require("mongoose")

function connectToDb(){
    
    mongoose.connect(`${conf.mongoDbUrl}/practice`)
    .then((res)=>{
        console.log("DB CONNECTED");
        // console.log(res)
    })
    .catch((err)=>{
        console.log("ERROR IN DB CONNECTION");
        console.log(err)
    })
}

module.exports = connectToDb;