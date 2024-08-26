const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // unique: true
    },
    password: {
        type: String,
        required: true,
    },
    wpm: [
        {
            wpm: {
                type: Number
            },
            cpm: {
                type: Number
            },
            date: {
                type: String,
                default:  new Date().toLocaleDateString()
            }
        }

    ]
})

module.exports = mongoose.model("user",userSchema);