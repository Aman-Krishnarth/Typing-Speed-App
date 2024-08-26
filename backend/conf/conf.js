require("dotenv").config()

const conf = {
    mongoDbUrl : process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
}

module.exports = conf;