const conf = require("../conf/conf")
const mongoose = require("mongoose")


function connectToDb(){
    console.log(conf.mongoDbUrl)
    
    mongoose.connect(`${conf.mongoDbUrl}/practice`)
    .then((res)=>{
        console.log("DB CONNECTED");
        // console.log(res)
    })
    .catch((err)=>{
        console.log("ERROR IN DB CONNECTION");

    })
}

module.exports = connectToDb;