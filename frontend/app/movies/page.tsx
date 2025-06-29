"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { useMovieSearch } from "@/hooks/useMovies"
import { SearchBar } from "@/components/search-bar"
import { SearchFilters } from "@/components/search-filters"
import { MovieCard } from "@/components/movie-card"
import { SearchResultsSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function MoviesPage() {
  const { query } = useAppSelector((state) => state.search)
  const [hasSearched, setHasSearched] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useMovieSearch()

  useEffect(() => {
    if (query.trim()) {
      setHasSearched(true)
    }
  }, [query])

  const movies = data?.pages.flatMap((page) => page.movies) || []
  const totalResults = data?.pages[0]?.totalResults || 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Movie Search</h1>
          <p className="text-muted-foreground text-lg mb-6">Discover your next favorite movie or TV show</p>
          <SearchBar />
        </motion.div>

        {/* Filters */}
        {query && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <SearchFilters />
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {!hasSearched && !query && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    🎬
                  </motion.div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Start Your Search</h2>
                <p className="text-muted-foreground">
                  Enter a movie or TV show title above to begin discovering amazing content
                </p>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SearchResultsSkeleton />
            </motion.div>
          )}

          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Alert className="max-w-md mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error?.message || "Failed to search movies. Please try again."}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {movies.length > 0 && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Search Results
                  {totalResults > 0 && (
                    <span className="text-muted-foreground font-normal ml-2">
                      ({totalResults.toLocaleString()} results)
                    </span>
                  )}
                </h2>
              </div>

              {/* Movies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {movies.map((movie, index) => (
                  <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} index={index} />
                ))}
              </div>

              {/* Load More */}
              {hasNextPage && (
                <div className="text-center">
                  <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} size="lg" variant="outline">
                    {isFetchingNextPage ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading More...
                      </>
                    ) : (
                      "Load More Movies"
                    )}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {hasSearched && !isLoading && !isError && movies.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center text-4xl">
                  🔍
                </div>
                <h2 className="text-2xl font-semibold mb-4">No Results Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any movies matching "{query}". Try adjusting your search terms or filters.
                </p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Clear Search
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
