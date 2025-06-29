import type { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { ApiError } from "../utils/ApiError"

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
        next(new ApiError(400, "Validation failed", errorMessages))
      } else {
        next(new ApiError(400, "Invalid request data"))
      }
    }
  }
}
