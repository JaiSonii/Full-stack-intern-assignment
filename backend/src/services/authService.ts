import { PrismaClient, type User } from "@prisma/client"
import crypto from "crypto"
import { hashPassword, comparePassword } from "../utils/password"
import { generateToken } from "../utils/jwt"
import { ApiError } from "../utils/ApiError"
import type { SignupResponse, LoginResponse } from "../types"

const prisma = new PrismaClient()

export class AuthService {
  static async signup(name: string, email: string, password: string): Promise<SignupResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ApiError(409, "User already exists with this email")
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return { user, token }
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new ApiError(401, "Invalid email or password")
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password")
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }

  static async getCurrentUser(userId: string): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    return user
  }

  static async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if email exists or not
      return
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Save reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // In a real app, send email here
    console.log(`Password reset token for ${email}: ${resetToken}`)
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset token")
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })
  }
}
