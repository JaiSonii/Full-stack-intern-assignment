import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { omdbApi, queryKeys } from "@/lib/api"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export function useMovieSearch() {
  const dispatch = useAppDispatch()
  const { query, filters } = useAppSelector((state) => state.search)

  return useInfiniteQuery({
    queryKey: queryKeys.movies(query, 1, filters),
    queryFn: async ({ pageParam = 1 }) => {
      if (!query.trim()) {
        throw new Error("Search query is required")
      }

      const response = await omdbApi.searchMovies(
        query,
        pageParam,
        filters.type || undefined,
        filters.year || undefined,
      )

      return {
        movies: response.Search || [],
        totalResults: Number.parseInt(response.totalResults) || 0,
        page: pageParam,
        hasNextPage: pageParam * 10 < Number.parseInt(response.totalResults),
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined
    },
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useMovieDetails(imdbId: string) {
  return useQuery({
    queryKey: queryKeys.movieDetails(imdbId),
    queryFn: () => omdbApi.getMovieDetails(imdbId),
    enabled: !!imdbId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useMovieSuggestions(query: string) {
  return useQuery({
    queryKey: queryKeys.suggestions(query),
    queryFn: () => omdbApi.getMovieSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
