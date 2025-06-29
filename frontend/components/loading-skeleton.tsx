"use client"
import { Card, CardContent } from "@/components/ui/card"

export function MovieCardSkeleton() {
  return (
    <Card className="movie-card h-full">
      <div className="relative overflow-hidden">
        <div className="movie-poster bg-muted animate-pulse" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="h-6 bg-muted rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-16 bg-muted rounded animate-pulse" />
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="w-full h-96 bg-muted rounded-lg animate-pulse" />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-6 w-20 bg-muted rounded animate-pulse" />
              <div className="h-6 w-24 bg-muted rounded animate-pulse" />
              <div className="h-6 w-16 bg-muted rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}
