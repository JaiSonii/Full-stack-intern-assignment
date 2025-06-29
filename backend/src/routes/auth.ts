import { Router } from "express"
import { AuthController } from "../controllers/authController"
import { authenticate } from "../middleware/auth"
import { validate } from "../middleware/validation"
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../utils/validation"

const router = Router()

// Public routes
router.post("/signup", validate(signupSchema), AuthController.signup)
router.post("/login", validate(loginSchema), AuthController.login)
router.post("/forgot-password", validate(forgotPasswordSchema), AuthController.forgotPassword)
router.post("/reset-password", validate(resetPasswordSchema), AuthController.resetPassword)

// Protected routes
router.get("/me", authenticate, AuthController.getCurrentUser)

export default router
