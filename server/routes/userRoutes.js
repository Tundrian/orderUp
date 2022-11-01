const express = require('express')
const router = express.Router()
const {
  getUserInfo,
  setUserInfo,
  updateUserInfo,
  deleteUserInfo,
} = require('../controllers/userInfoController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getUserInfo).post(protect, setUserInfo)
router.route('/:id').delete(protect, deleteUserInfo).put(protect, updateUserInfo)

module.exports = router