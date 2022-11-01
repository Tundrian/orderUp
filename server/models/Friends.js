const mongoose = require('mongoose')

const friendsSchema = mongoose.schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    friends: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            name: {
                type: String,
            }
        }]
    },
})

module.exports = mongoose.model("Friend", friendsSchema)