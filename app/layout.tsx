import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/google-analytics'
import './globals.css'

const notoSans = Noto_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnex.com'),
  title: {
    default: 'FitneX - Transform Your Body, Transform Your Health',
    template: '%s | FitneX'
  },
  description: 'Join hundreds of clients globally who have achieved their fitness goals with FitneX. Expert trainers, personalized workout and nutrition plans. Standard, Premium, and Couple plans available.',
  keywords: ['fitness', 'gym', 'personal training', 'nutrition', 'weight loss', 'muscle gain', 'fitness coach', 'online fitness', 'fitness transformation'],
  authors: [{ name: 'FitneX' }],
  creator: 'FitneX',
  publisher: 'FitneX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnex.com',
    siteName: 'FitneX',
    title: 'FitneX - Transform Your Body, Transform Your Health',
    description: 'Join hundreds of clients globally who have achieved their fitness goals with FitneX. Expert trainers, personalized workout and nutrition plans.',
    images: [
      {
        url: '/hero1.jpg',
        width: 1200,
        height: 630,
        alt: 'FitneX Fitness Transformation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitneX - Transform Your Body, Transform Your Health',
    description: 'Join hundreds of clients globally who have achieved their fitness goals with FitneX.',
    images: ['/hero1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-YHR6GZDWFN'} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
