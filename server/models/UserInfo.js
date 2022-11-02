const mongoose = require('mongoose')

const { Schema } = mongoose
mongoose.Promise = global.Promise;

const userInfoSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    theme: {
        type: String,
    }
})

module.exports = mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema)