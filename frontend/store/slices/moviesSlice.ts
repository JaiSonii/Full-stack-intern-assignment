import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
  Plot?: string
  Director?: string
  Actors?: string
  Genre?: string
  Runtime?: string
  imdbRating?: string
  Released?: string
  Writer?: string
  Language?: string
  Country?: string
  Awards?: string
  Ratings?: Array<{
    Source: string
    Value: string
  }>
}

interface MoviesState {
  movies: Movie[]
  selectedMovie: Movie | null
  loading: boolean
  error: string | null
  totalResults: number
  currentPage: number
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: Movie[]; totalResults: number; page: number }>) => {
      state.movies = action.payload.movies
      state.totalResults = action.payload.totalResults
      state.currentPage = action.payload.page
    },
    appendMovies: (state, action: PayloadAction<{ movies: Movie[]; totalResults: number; page: number }>) => {
      state.movies = [...state.movies, ...action.payload.movies]
      state.totalResults = action.payload.totalResults
      state.currentPage = action.payload.page
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearMovies: (state) => {
      state.movies = []
      state.totalResults = 0
      state.currentPage = 1
    },
  },
})

export const { setMovies, appendMovies, setSelectedMovie, setLoading, setError, clearMovies } = moviesSlice.actions

export default moviesSlice.reducer
