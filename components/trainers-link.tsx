'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface TrainersLinkProps {
  children: React.ReactNode
  className?: string
}

export function TrainersLink({ children, className }: TrainersLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the home page, scroll to the section
    if (pathname === '/') {
      e.preventDefault()
      const trainersSection = document.getElementById('trainers')
      if (trainersSection) {
        trainersSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Otherwise, let the Link handle navigation normally
    // The useEffect in the page component will handle scrolling after navigation
  }

  return (
    <Link href="/#trainers" onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}


