import express from "express"
import {
    adminLogin,
    verifyAdminOTP
} from "../controllers/adminController.js"

const router = express.Router()

router.post("/login", adminLogin)
router.post("/verify-otp", verifyAdminOTP)

export default router