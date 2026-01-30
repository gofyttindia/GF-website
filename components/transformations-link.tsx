'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface TransformationsLinkProps {
  children: React.ReactNode
  className?: string
}

export function TransformationsLink({ children, className }: TransformationsLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the home page, scroll to the section
    if (pathname === '/') {
      e.preventDefault()
      const transformationsSection = document.getElementById('transformations')
      if (transformationsSection) {
        transformationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Otherwise, let the Link handle navigation normally
    // The useEffect in the page component will handle scrolling after navigation
  }

  return (
    <Link href="/#transformations" onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}


