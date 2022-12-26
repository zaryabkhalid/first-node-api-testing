import jwt from "jsonwebtoken"
import User from "../model/userModel.js"
import asyncHandler from "express-async-handler"
import CustomErrors from "../errors/CustomErrors.js"

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(" ")[1]

      // verify token
      const decode = jwt.verify(token, process.env.APP_JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decode.id).select("-password")
      next()
    } catch (error) {
      next(CustomErrors.AuthorizationError())
    }
  }

  if (!token) {
    next(CustomErrors.AuthorizationError("Access Denied Error"))
  }
})
