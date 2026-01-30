'use client'

import Link from "next/link"

interface WhatsAppLinkProps {
  children: React.ReactNode
  planName: string
  className?: string
}

export function WhatsAppLink({ children, planName, className }: WhatsAppLinkProps) {
  const phoneNumber = "917702608961"
  const message = encodeURIComponent(`Hi FitneX, I would like to join ${planName} program. I would like to talk more about it.`)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <Link 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  )
}

