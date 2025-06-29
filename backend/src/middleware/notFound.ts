import type { Request, Response } from "express"
import type { ApiResponse } from "../types"

export const notFound = (req: Request, res: Response<ApiResponse>) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: "Not Found",
  })
}
