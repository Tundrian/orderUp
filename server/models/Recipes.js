const mongoose = require('mongoose')

const recipeSchema = mongoose.schema({
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