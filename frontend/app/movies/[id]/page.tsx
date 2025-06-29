"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Globe, Star, Users, Award } from "lucide-react"
import { useMovieDetails } from "@/hooks/useMovies"
import { StarRating } from "@/components/star-rating"
import { MovieDetailsSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MovieDetailsPageProps {
  params: {
    id: string
  }
}

export default function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { data: movie, isLoading, isError, error } = useMovieDetails(params.id)

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  if (isError || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Alert>
            <AlertDescription>
              {error?.message || "Movie not found. Please check the URL and try again."}
            </AlertDescription>
          </Alert>
          <Link href="/movies" className="mt-4 inline-block">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const movieInfo = [
    { label: "Director", value: movie.Director, icon: Users },
    { label: "Writer", value: movie.Writer, icon: Users },
    { label: "Actors", value: movie.Actors, icon: Users },
    { label: "Genre", value: movie.Genre, icon: null },
    { label: "Runtime", value: movie.Runtime, icon: Clock },
    { label: "Released", value: movie.Released, icon: Calendar },
    { label: "Language", value: movie.Language, icon: Globe },
    { label: "Country", value: movie.Country, icon: Globe },
    { label: "Awards", value: movie.Awards, icon: Award },
  ].filter((info) => info.value && info.value !== "N/A")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/movies">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <Image
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=600&width=400"}
                  alt={movie.Title}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=600&width=400"
                  }}
                />
              </Card>
            </div>
          </motion.div>

          {/* Movie Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="outline" className="text-sm">
                  {movie.Year}
                </Badge>
                <Badge variant="outline" className="text-sm capitalize">
                  {movie.Type}
                </Badge>
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.imdbRating}/10</span>
                    <span className="text-muted-foreground text-sm">IMDb</span>
                  </div>
                )}
              </div>
            </div>

            {/* User Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <StarRating movieId={movie.imdbID} movieTitle={movie.Title} size="lg" />
              </CardContent>
            </Card>

            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <Card>
                <CardHeader>
                  <CardTitle>Plot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{movie.Plot}</p>
                </CardContent>
              </Card>
            )}

            {/* Movie Information */}
            <Card>
              <CardHeader>
                <CardTitle>Movie Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movieInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        {info.icon && <info.icon className="w-4 h-4 text-muted-foreground" />}
                        <span className="font-medium text-sm">{info.label}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{info.value}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ratings from Different Sources */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {movie.Ratings.map((rating, index) => (
                      <motion.div
                        key={rating.Source}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-center p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="font-medium text-sm mb-1">{rating.Source}</div>
                        <div className="text-2xl font-bold text-primary">{rating.Value}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
