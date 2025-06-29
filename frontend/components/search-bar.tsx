"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setQuery, addRecentSearch, clearRecentSearches } from "@/store/slices/searchSlice"
import { useDebounce } from "@/hooks/useDebounce"
import { useMovieSuggestions } from "@/hooks/useMovies"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const dispatch = useAppDispatch()
  const { query, recentSearches } = useAppSelector((state) => state.search)
  const [localQuery, setLocalQuery] = useState(query)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debouncedQuery = useDebounce(localQuery, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: suggestions = [] } = useMovieSuggestions(debouncedQuery)

  useEffect(() => {
    if (debouncedQuery !== query) {
      dispatch(setQuery(debouncedQuery))
    }
  }, [debouncedQuery, query, dispatch])

  const handleSearch = (searchQuery: string) => {
    setLocalQuery(searchQuery)
    dispatch(setQuery(searchQuery))
    dispatch(addRecentSearch(searchQuery))
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    setLocalQuery("")
    dispatch(setQuery(""))
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && localQuery.trim()) {
      handleSearch(localQuery)
    }
    if (e.key === "Escape") {
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for movies, TV shows..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-12 text-base"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (localQuery.length >= 2 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Suggestions</div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-2 border-t border-border">
                <div className="flex items-center justify-between mb-2 px-2">
                  <div className="text-xs font-medium text-muted-foreground">Recent Searches</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(clearRecentSearches())}
                    className="text-xs h-auto p-1"
                  >
                    Clear
                  </Button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
