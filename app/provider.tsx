'use client'

import React, {useState, useEffect} from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'


export default function Provider({children}: {children: React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient( {
        defaultOptions: {
            queries: {
                staleTime: 0,
                refetchOnWindowFocus: true,
                refetchOnReconnect: true,
                retry: 2,
                retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
              },
              mutations: {
                retry: 2,
                retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
              }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
            <ReactQueryStreamedHydration>{children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}
