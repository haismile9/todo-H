// src/lib/queryClient.js
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,          // 30s coi là "tươi", không refetch thừa
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
