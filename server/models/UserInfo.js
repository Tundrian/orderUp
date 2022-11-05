const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    theme: {
        type: String,
    }
})

module.exports = mongoose.model("UserInfo", userInfoSchema)