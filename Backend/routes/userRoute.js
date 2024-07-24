const express = require('express');
const { registerUser, login, getUserProfile, updateUserProfile } = require('../controllers/UserController');
const { protect } = require('../middleware/jwt');
const router = express.Router();

router.route("/").post(registerUser)
router.route("/login").post(login)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile); 


module.exports = router; 