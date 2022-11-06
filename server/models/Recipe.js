const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    recipeID: {
        type: String,
    },
    recipeName: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    mealtime: {
        type: String,
    }
})

module.exports = mongoose.model("Recipe", recipeSchema)