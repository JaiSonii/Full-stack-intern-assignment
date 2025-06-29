"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setRating, removeRating } from "@/store/slices/ratingsSlice"

interface StarRatingProps {
  movieId: string
  movieTitle: string
  size?: "sm" | "md" | "lg"
  readonly?: boolean
}

export function StarRating({ movieId, movieTitle, size = "md", readonly = false }: StarRatingProps) {
  const dispatch = useAppDispatch()
  const currentRating = useAppSelector((state) => state.ratings.ratings[movieId]) || 0
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleRating = (rating: number) => {
    if (readonly) return

    if (rating === currentRating) {
      dispatch(removeRating(movieId))
    } else {
      dispatch(setRating({ movieId, rating }))
    }
  }

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoverRating(rating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  const displayRating = hoverRating || currentRating

  return (
    <div className="flex flex-col gap-2">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => handleRating(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`star ${sizeClasses[size]} ${
              star <= displayRating ? "filled" : "empty"
            } ${readonly ? "cursor-default" : "cursor-pointer"}`}
            whileHover={readonly ? {} : { scale: 1.1 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
          >
            <Star
              className={`w-full h-full ${
                star <= displayRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-muted-foreground hover:text-yellow-400"
              }`}
            />
          </motion.button>
        ))}
      </div>

      {!readonly && (
        <div className="text-sm text-muted-foreground">
          {currentRating > 0 ? (
            <span>Your rating: {currentRating}/5 stars</span>
          ) : (
            <span>Click to rate "{movieTitle}"</span>
          )}
        </div>
      )}
    </div>
  )
}
