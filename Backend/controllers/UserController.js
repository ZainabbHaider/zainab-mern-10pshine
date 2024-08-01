const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const  logger  = require('../logger');

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      // Set token in an HTTP-only cookie
      res.cookie("token", generateToken(user._id), {
        httpOnly: true,
      });

      logger.info(`User registered successfully: ${user.email}`);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id), // Include token in the response if necessary
      });
    } else {
      logger.error("Invalid user data");
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Set token in an HTTP-only cookie
      res.cookie("token", generateToken(user._id), {
        httpOnly: true,
      });

      logger.info(`User logged in successfully: ${user.email}`);
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    } else {
      logger.error("Invalid email or password");
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    logger.error(`Error logging in: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      logger.info(`User profile retrieved: ${user.email}`);
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      logger.error("User not found");
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    logger.error(`Error retrieving user profile: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const { firstName, lastName, email, password } = req.body;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) user.password = password;

      const updatedUser = await user.save();

      logger.info(`User profile updated: ${updatedUser.email}`);
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      logger.error("User not found");
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    logger.error(`Error updating user profile: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = { registerUser, login, getUserProfile, updateUserProfile };
