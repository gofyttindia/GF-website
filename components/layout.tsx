import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"
import { ProgramsLink } from "@/components/programs-link"
import { TrainersLink } from "@/components/trainers-link"
import { TransformationsLink } from "@/components/transformations-link"
import { ReviewsLink } from "@/components/reviews-link"
import { ContactLink } from "@/components/contact-link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="FitCore Logo" 
            width={100} 
            height={40} 
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
            Home
          </Link>
          <TrainersLink className="text-gray-700 hover:text-orange-600 transition-colors">
            Trainers
          </TrainersLink>
          <ProgramsLink className="text-gray-700 hover:text-orange-600 transition-colors">
            Membership
          </ProgramsLink>
          <TransformationsLink className="text-gray-700 hover:text-orange-600 transition-colors">
            Transformations
          </TransformationsLink>
          <ReviewsLink className="text-gray-700 hover:text-orange-600 transition-colors">
            Reviews
          </ReviewsLink>
          <ContactLink className="text-gray-700 hover:text-orange-600 transition-colors">
            Contact
          </ContactLink>
          <Link href="/form" className="text-gray-700 hover:text-orange-600 transition-colors">
            Get Started
          </Link>
        </nav>
        <Link 
          href="https://whatsform.com/je9eve"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-orange-600 hover:bg-orange-700">
            Join Now
          </Button>
        </Link>
      </div>
    </header>
  )
}

export function Footer() {
  return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="FitneX Logo" 
                width={100} 
                height={60} 
                className="h-[60px] w-auto"
              />
            </div>
            <p className="text-gray-400">Transform your body, transform your life. Join the FitneX family today.</p>
            <div className="flex items-center justify-center space-x-4 pt-4">
              <Link
                href="https://www.instagram.com/fitnex_india/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-600 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FitneX. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
