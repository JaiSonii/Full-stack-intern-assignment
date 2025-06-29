import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"
import type { ApiResponse } from "../types"

export const errorHandler = (error: Error, req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  console.error("Error:", error)

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.details || error.message,
    })
  }

  // Prisma errors
  if (error.name === "PrismaClientKnownRequestError") {
    const prismaError = error as any
    if (prismaError.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Resource already exists",
        error: "Duplicate entry",
      })
    }
  }

  // JWT errors
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed",
    })
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
      error: "Please login again",
    })
  }

  // Default error
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  })
}
