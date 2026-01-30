'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface ContactLinkProps {
  children: React.ReactNode
  className?: string
}

export function ContactLink({ children, className }: ContactLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the home page, scroll to the section
    if (pathname === '/') {
      e.preventDefault()
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Otherwise, let the Link handle navigation normally
    // The useEffect in the page component will handle scrolling after navigation
  }

  return (
    <Link href="/#contact" onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

