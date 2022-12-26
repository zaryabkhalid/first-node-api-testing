import express from "express"
import {
  createUser,
  getUsersData,
  loginUser,
} from "../controllers/userController.js"
import { protect } from "../middleware/authHandler.js"

const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/users", protect, getUsersData)

export default router
