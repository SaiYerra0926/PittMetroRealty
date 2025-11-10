import { Suspense } from 'react'
import PageLoader from './PageLoader'

interface LazyLoadProps {
  children: React.ReactNode
}

export const LazyLoad = ({ children }: LazyLoadProps) => {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  )
}