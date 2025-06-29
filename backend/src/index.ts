import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import { PrismaClient } from "@prisma/client"

import authRoutes from "./routes/auth"
import adminRoutes from "./routes/admin"
import { errorHandler } from "./middleware/errorHandler"
import { notFound } from "./middleware/notFound"

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(limiter)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Routes
app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully")
  await prisma.$disconnect()
  process.exit(0)
})

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully")
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV} || 'development'`)
})

export default app
