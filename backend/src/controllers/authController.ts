import type { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/authService"
import type { AuthRequest, ApiResponse } from "../types"

export class AuthController {
  static async signup(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { name, email, password } = req.body
      const result = await AuthService.signup(name, email, password)

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { email, password } = req.body
      const result = await AuthService.login(email, password)

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async getCurrentUser(req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const user = await AuthService.getCurrentUser(req.user!.id)

      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { email } = req.body
      await AuthService.forgotPassword(email)

      res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent",
      })
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { token, password } = req.body
      await AuthService.resetPassword(token, password)

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      })
    } catch (error) {
      next(error)
    }
  }
}
