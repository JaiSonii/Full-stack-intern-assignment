import type { Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import type { AuthRequest } from "../types"
import { verifyToken } from "../utils/jwt"
import { ApiError } from "../utils/ApiError"

const prisma = new PrismaClient()

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token required")
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new ApiError(401, "User not found")
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof ApiError) {
      next(error)
    } else {
      next(new ApiError(401, "Invalid or expired token"))
    }
  }
}

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"))
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"))
    }

    next()
  }
}
