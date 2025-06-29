import { configureStore } from "@reduxjs/toolkit"
import moviesReducer from "./slices/moviesSlice"
import searchReducer from "./slices/searchSlice"
import ratingsReducer from "./slices/ratingsSlice"

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
    ratings: ratingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
