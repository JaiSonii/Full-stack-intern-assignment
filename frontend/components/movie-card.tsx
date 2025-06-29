"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, Calendar, Film } from "lucide-react"
import type { Movie } from "@/store/slices/moviesSlice"
import { useAppSelector } from "@/store/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MovieCardProps {
  movie: Movie
  index?: number
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const userRating = useAppSelector((state) => state.ratings.ratings[movie.imdbID])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/movies/${movie.imdbID}`}>
        <Card className="movie-card h-full cursor-pointer group">
          <div className="relative overflow-hidden">
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=400&width=300"}
              alt={movie.Title}
              width={300}
              height={400}
              className="movie-poster group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=300"
              }}
            />
            {userRating && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{userRating}</span>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {movie.Title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{movie.Year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Film className="w-4 h-4" />
                <span className="capitalize">{movie.Type}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {movie.Type.toUpperCase()}
              </Badge>

              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{movie.imdbRating}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
