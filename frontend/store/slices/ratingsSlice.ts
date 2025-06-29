import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface RatingsState {
  ratings: Record<string, number> // imdbID -> rating
}

const initialState: RatingsState = {
  ratings: {},
}

// Load ratings from localStorage
if (typeof window !== "undefined") {
  const savedRatings = localStorage.getItem("movieRatings")
  if (savedRatings) {
    try {
      initialState.ratings = JSON.parse(savedRatings)
    } catch (error) {
      console.error("Failed to parse saved ratings:", error)
    }
  }
}

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ movieId: string; rating: number }>) => {
      state.ratings[action.payload.movieId] = action.payload.rating

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("movieRatings", JSON.stringify(state.ratings))
      }
    },
    removeRating: (state, action: PayloadAction<string>) => {
      delete state.ratings[action.payload]

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("movieRatings", JSON.stringify(state.ratings))
      }
    },
    clearAllRatings: (state) => {
      state.ratings = {}

      // Clear from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("movieRatings")
      }
    },
  },
})

export const { setRating, removeRating, clearAllRatings } = ratingsSlice.actions

export default ratingsSlice.reducer
