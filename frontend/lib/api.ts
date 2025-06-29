import type { Movie } from "@/store/slices/moviesSlice"

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY
const OMDB_BASE_URL = "https://www.omdbapi.com/"

if (!OMDB_API_KEY) {
  throw new Error("OMDB API key is required. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables.")
}

export interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
  Error?: string
}

export interface MovieDetailsResponse extends Movie {
  Response: string
  Error?: string
}

class OMDBApi {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = OMDB_API_KEY!
    this.baseUrl = OMDB_BASE_URL
  }

  private async makeRequest<T>(params: Record<string, string>): Promise<T> {
    const url = new URL(this.baseUrl)
    url.searchParams.set("apikey", this.apiKey)

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value)
      }
    })

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === "False") {
      throw new Error(data.Error || "Unknown API error")
    }

    return data
  }

  async searchMovies(query: string, page = 1, type?: string, year?: string): Promise<SearchResponse> {
    const params: Record<string, string> = {
      s: query,
      page: page.toString(),
    }

    if (type) params.type = type
    if (year) params.y = year

    return this.makeRequest<SearchResponse>(params)
  }

  async getMovieDetails(imdbId: string): Promise<MovieDetailsResponse> {
    return this.makeRequest<MovieDetailsResponse>({
      i: imdbId,
      plot: "full",
    })
  }

  async getMovieSuggestions(query: string): Promise<string[]> {
    try {
      const response = await this.searchMovies(query, 1)
      return response.Search?.slice(0, 5).map((movie) => movie.Title) || []
    } catch (error) {
      console.log("Failed to get suggestions:", error)
      return []
    }
  }
}

export const omdbApi = new OMDBApi()

// React Query keys
export const queryKeys = {
  movies: (query: string, page: number, filters: Record<string, string>) => ["movies", query, page, filters],
  movieDetails: (imdbId: string) => ["movie", imdbId],
  suggestions: (query: string) => ["suggestions", query],
}
