'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface ProgramsLinkProps {
  children: React.ReactNode
  className?: string
}

export function ProgramsLink({ children, className }: ProgramsLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the home page, scroll to the elite section
    if (pathname === '/') {
      e.preventDefault()
      const eliteSection = document.getElementById('elite')
      if (eliteSection) {
        eliteSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Otherwise, let the Link handle navigation normally
    // The useEffect in the page component will handle scrolling after navigation
  }

  return (
    <Link href="/#elite" onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

