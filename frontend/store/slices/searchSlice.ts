import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchState {
  query: string
  filters: {
    year: string
    type: string
    genre: string
  }
  suggestions: string[]
  recentSearches: string[]
}

const initialState: SearchState = {
  query: "",
  filters: {
    year: "",
    type: "",
    genre: "",
  },
  suggestions: [],
  recentSearches: [],
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<SearchState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim()
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches = [query, ...state.recentSearches.slice(0, 4)]
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = []
    },
    clearFilters: (state) => {
      state.filters = {
        year: "",
        type: "",
        genre: "",
      }
    },
  },
})

export const { setQuery, setFilters, setSuggestions, addRecentSearch, clearRecentSearches, clearFilters } =
  searchSlice.actions

export default searchSlice.reducer
