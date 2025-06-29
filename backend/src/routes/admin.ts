import { Router } from "express"
import { AdminController } from "../controllers/adminController"
import { authenticate, authorize } from "../middleware/auth"
import { validate } from "../middleware/validation"
import { updateRoleSchema } from "../utils/validation"

const router = Router()

// Admin only routes
router.get("/users", authenticate, authorize(["ADMIN"]), AdminController.getAllUsers)
router.put(
  "/users/:id/role",
  authenticate,
  authorize(["ADMIN"]),
  validate(updateRoleSchema),
  AdminController.updateUserRole,
)

export default router
