const conf = require("../conf/conf")
const mongoose = require("mongoose")

function connectToDb(){
    
    mongoose.connect(conf.mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res)=>{
        console.log("DB CONNECTED");
    })
    .catch((err)=>{
        console.log("ERROR IN DB CONNECTION");
        console.log(err)
    })
}

module.exports = connectToDb;