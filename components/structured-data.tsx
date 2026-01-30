export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnex.com'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FitneX',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: 'Transform your body, transform your life. Expert fitness trainers and personalized workout plans.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7702608961',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      // Add your social media links here
      // 'https://www.facebook.com/fitnex',
      // 'https://www.instagram.com/fitnex',
      // 'https://twitter.com/fitnex',
    ],
  }

  const fitnessCenterSchema = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: 'FitneX',
    description: 'Online fitness coaching with expert trainers, personalized workout and nutrition plans.',
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    priceRange: '₹₹',
    offers: [
      {
        '@type': 'Offer',
        name: 'Standard Plan',
        price: '9999',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Premium Plan',
        price: '14999',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fitnessCenterSchema) }}
      />
    </>
  )
}

