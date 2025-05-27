'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  )
} 