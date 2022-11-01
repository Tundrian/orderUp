const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required: [true, "Please add a username"],
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    email: {
        type: String,
        required: [true, "Please add an email address"],
        unique: true,
    }
}, {timestamps: true,})

module.exports = mongoose.model("User", userSchema)