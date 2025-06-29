"use client"

import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setFilters, clearFilters } from "@/store/slices/searchSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const MOVIE_TYPES = [
  { value: "all", label: "All Types" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "TV Series" },
  { value: "episode", label: "Episodes" },
]

const YEARS = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i
  return { value: year.toString(), label: year.toString() }
})

export function SearchFilters() {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector((state) => state.search)

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    dispatch(setFilters({ [key]: value }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Search Filters</h4>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-auto p-1 text-xs">
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOVIE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Year</label>
                <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {YEARS.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.type && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {MOVIE_TYPES.find((t) => t.value === filters.type)?.label}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange("type", "")}
                className="h-auto p-0 ml-1 hover:bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          </motion.div>
        )}

        {filters.year && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Badge variant="secondary" className="flex items-center gap-1">
              Year: {filters.year}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange("year", "")}
                className="h-auto p-0 ml-1 hover:bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  )
}
