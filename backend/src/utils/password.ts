import bcrypt from "bcryptjs"

const BCRYPT_ROUNDS = Number.parseInt(process.env.BCRYPT_ROUNDS || "12")

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
