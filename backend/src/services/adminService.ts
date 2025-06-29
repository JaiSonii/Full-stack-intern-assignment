import { PrismaClient, type Role } from "@prisma/client"
import { ApiError } from "../utils/ApiError"

const prisma = new PrismaClient()

export class AdminService {
  static async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  static async updateUserRole(userId: string, role: Role) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    return prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
}
