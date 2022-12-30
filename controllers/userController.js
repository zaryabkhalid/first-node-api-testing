import asyncHandler from "express-async-handler";
import CustomErrors from "../errors/CustomErrors.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT.js";

// Register Controller
export const createUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (!firstname || !lastname || !username || !email || !password) {
    next(CustomErrors.validationError("All fields are required..."));
  }
  const userExists = await User.exists({ username, email });
  if (userExists) {
    next(CustomErrors.validationError("User Already exists..."));
  } else {
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        message: "User registration successful",
        data: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          token: generateJWT(user._id),
        },
      });
    } else {
      next(CustomErrors.SomethingWentWrong());
    }
  }
});

// Login Controller
export const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      CustomErrors.validationError("Username and password are required...")
    );
  }
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Login Successful",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        jwt: generateJWT(user._id),
      },
    });
  } else {
    return next(CustomErrors.validationError("Invalid user cradentials"));
  }
});

// Get User Data
export const getUsersData = asyncHandler(async (req, res, next) => {
  const { id, username, email } = await User.findById(req.user._id);
  return res.status(200).json({
    id: id,
    name: username,
    email: email,
  });
});
