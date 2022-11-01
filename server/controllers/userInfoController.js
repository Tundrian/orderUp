const asyncHandler = require('express-async-handler')

const UserInfo = require('../models/userInfo')
const User = require('../models/User')

// @desc    Get user info
// @route   GET /api/user
// @access  Private
const getUserInfo = asyncHandler(async (req, res) => {
  const userInfo = await UserInfo.find({ userID: req.user.id })

  res.status(200).json(userInfo)
})

// @desc    Set userInfo
// @route   POST /api/user
// @access  Private
const setUserInfo = asyncHandler(async (req, res) => {
    const [name, email, theme] = req.body

   if (!name && !email && !theme) {
    res.status(400)
    throw new Error('Nothing to change')
  }

  const userInfo = await UserInfo.create({
    name: req.body.name !== '' ? req.body.name : name,
    email: req.body.email !== '' ? req.body.email : email,
    theme: req.body.theme !== '' ? req.body.theme : theme
  })

  res.status(200).json(userInfo)
})

// @desc    Update user info
// @route   PUT /api/user/:id
// @access  Private
const updateUserInfo = asyncHandler(async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id)

  if (!userInfo) {
    res.status(400)
    throw new Error('User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Unauthorized request')
  }

  // Make sure the logged in user matches the goal user
  if (userInfo.userID.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedUserInfo = await UserInfo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUserInfo)
})

// @desc    Delete user info
// @route   DELETE /api/user/:id
// @access  Private
const deleteUserInfo = asyncHandler(async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id)

  if (!userInfo) {
    res.status(400)
    throw new Error('User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (userInfo.userID.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await userInfo.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getUserInfo,
  setUserInfo,
  updateUserInfo,
  deleteUserInfo,
}