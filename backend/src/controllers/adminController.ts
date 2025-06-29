import type { Response, NextFunction } from "express"
import { AdminService } from "../services/adminService"
import type { AuthRequest, ApiResponse } from "../types"

export class AdminController {
  static async getAllUsers(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const users = await AdminService.getAllUsers()

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: { users },
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateUserRole(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { id } = req.params
      const { role } = req.body

      const user = await AdminService.updateUserRole(id, role)

      res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }
}
