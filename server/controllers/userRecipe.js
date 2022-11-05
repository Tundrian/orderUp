const asyncHandler = require('express-async-handler')

const Recipe = require('../models/Recipe')
// const User = require('../models/User')

// @desc    Get user info
// @route   GET /api/user
// @access  Private
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.find({userID: req.user.id})

  res.status(200).json(recipe)
})

// @desc    Set recipe
// @route   POST /api/user
// @access  Private
const setRecipe = asyncHandler(async (req, res) => {
    const [userID, recipeID, recipeName, imageURL, mealtime] = req.body

   if (!userID && !recipeID && !recipeName && !imageURL && !mealtime) {
    res.status(400)
    throw new Error('Nothing to change')
  }

  const recipe = await Recipe.create({
    userID: req.body.userID !== '' ? req.body.userID : userID,
    recipeID: req.body.recipeID !== '' ? req.body.recipeID : recipeID,
    recipeName: req.body.recipeName !== '' ? req.body.recipeName : recipeName,
    imageURL: req.body.imageURL !== '' ? req.body.imageURL : imageURL,
    mealtime: req.body.mealtime !== '' ? req.body.mealtime : mealtime,
  })
  
  res.status(200).json(recipe)
})

// @desc    Update user info
// @route   PUT /api/user/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(    { 
    userID: req.user.id, 
    id: req.params.id
  })

  if (!recipe) {
    res.status(400)
    throw new Error('User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Unauthorized request')
  }

  // Make sure the logged in user matches the goal user
  if (recipe.userID.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedRecipe)
})

// @desc    Delete user info
// @route   DELETE /api/user/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if (!recipe) {
    res.status(400)
    throw new Error('User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (recipe.userID.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await recipe.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getRecipe,
  setRecipe,
  updateRecipe,
  deleteRecipe,
}