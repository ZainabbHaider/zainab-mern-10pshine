const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id), // Include token in the response if necessary
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Set token in an HTTP-only cookie
    res.cookie("token", generateToken(user._id), {
      httpOnly: true,
    });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, login };
