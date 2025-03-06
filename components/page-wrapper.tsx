'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
  
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-between"
        key={pathname}
      >
        {children}
      </div>
    )
  }