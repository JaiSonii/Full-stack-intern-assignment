"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { ThemeProvider } from "@/components/theme-provider"
import { store } from "@/store"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
