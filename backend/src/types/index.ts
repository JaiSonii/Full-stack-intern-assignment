import type { Request } from "express"
import type { User } from "@prisma/client"

export interface AuthRequest extends Request {
  user?: User
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface LoginResponse {
  user: Omit<User, "password">
  token: string
}

export interface SignupResponse {
  user: Omit<User, "password">
  token: string
}
