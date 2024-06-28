const express = require('express');
const { registerUser, login } = require('../controllers/UserController');
const router = express.Router();

router.route("/").post(registerUser)
router.route("/login").post(login)

module.exports = router; 