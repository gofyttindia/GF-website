'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header, Footer } from "@/components/layout"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { TransformationsCarousel } from "@/components/transformations-carousel"
import { ProgramsLink } from "@/components/programs-link"
import { ContactLink } from "@/components/contact-link"
import { StructuredData } from "@/components/structured-data"
import { Dumbbell, Users, Target, CheckCircle, Clock, Calendar, Trophy, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function HomePage() {
  const [clientCount, setClientCount] = useState(500)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number | null = null
    let hasStarted = false

    const animateCounter = () => {
      if (hasStarted) return
      hasStarted = true

      const duration = 2000 // 2 seconds
      const start = 500
      const end = 1000
      const startTime = Date.now()

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = Math.floor(start + (end - start) * easeOutQuart)
        
        setClientCount(current)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setClientCount(1000)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Animate counter when hero section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = heroRef.current
    if (currentRef) {
      // Check if already visible
      const rect = currentRef.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isVisible) {
        // Start animation after a short delay if already visible
        setTimeout(animateCounter, 500)
      } else {
        // Observe for when it becomes visible
        observer.observe(currentRef)
      }
    }

    // Fallback: start animation after 1 second regardless
    const fallbackTimeout = setTimeout(() => {
      if (!hasStarted) {
        animateCounter()
        observer.disconnect()
      }
    }, 1000)

    return () => {
      if (currentRef) {
        observer.disconnect()
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      clearTimeout(fallbackTimeout)
    }
  }, [])

  useEffect(() => {
    // Handle scroll when page loads with hash
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  // Also handle hash changes (e.g., when clicking links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your Body,
                  <span className="text-orange-600"> Transform Your Health</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join hundreds of clients globally who have achieved their fitness goals with our expert trainers, personalized workout and nutrition plans.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Link href="#founders">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-5 py-2.5 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent w-[150px] sm:w-auto sm:min-w-[126px]"
                  >
                    Mentors
                  </Button>
                </Link>
                <Link href="#transformations">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-5 py-2.5 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent w-[150px] sm:w-auto sm:min-w-[126px]"
                  >
                    Transformations
                  </Button>
                </Link>
                <Link href="#elite">
                <Button
                  size="lg"
                  variant="outline"
                    className="text-base px-5 py-2.5 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent w-[150px] sm:w-auto sm:min-w-[126px]"
                >
                    View Programs
                </Button>
                </Link>
                <Link href="#reviews">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-5 py-2.5 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent w-[150px] sm:w-auto sm:min-w-[126px]"
                  >
                    Testimonials
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{clientCount}+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-gray-600">Expert Coaches</div>
                </div>
                
              </div>
            </div>
            <div className="relative">
              <div className="relative max-w-md mx-auto aspect-[5/6]">
                      <Image
                  src="/hero1.jpg"
                  alt="Hero image"
                        width={400}
                        height={480}
                  priority
                  className="rounded-2xl shadow-2xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformations Section */}
      <section id="transformations" className="pt-10 pb-20 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Transformations</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Real Results, Real People</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the incredible transformations our members have achieved through dedication and our expert guidance.
            </p>
          </div>

          <TransformationsCarousel />
        </div>
      </section>

      {/* Trainers Preview */}
      <section id="founders" className="pt-20 pb-10 bg-gray-50 scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            
            <h2 className="text-4xl font-bold text-gray-900">Meet Our Head Coaches</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our certified fitness professionals are here to guide, motivate, and support you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Siva */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/shiva-profile.jpg"
                  alt="Shiva - Head Coach"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Shiva</h3>
                  <p className="text-orange-600 font-semibold">Head Coach - Competition Prep Specialist</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>10+ years of experience</span>
                  </div>
                  
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                Shiva leads the team as Head Coach, specializing in competition preparation and elite-level conditioning. His expertise lies in structured training, precise nutrition planning, and peak-performance execution. 
                Known for discipline and detail, Shiva works with athletes and serious trainees who aim for stage-ready physiques and high-performance results.
                </p>

                

                
              </CardContent>
            </Card>

            {/* Gowrav Reddy */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/gowrav-profile.jpg"
                  alt="Gowrav Reddy"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-[center_10%]"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Gowrav Reddy</h3>
                  <p className="text-orange-600 font-semibold">Lifestyle Coach - Habit Transformation Expert</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>8+ years of experience</span>
                  </div>
                  
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                Gowrav focuses on lifestyle coaching, mentorship, and habit transformation. He helps individuals build sustainable fitness routines by aligning training, nutrition, mindset, and daily discipline with real-life responsibilities. 
                His coaching emphasizes long-term consistency over short-term fixes.
                </p>

                

                
              </CardContent>
            </Card>

            {/* Eshwar */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/eshwar-profile.jpg"
                  alt="Eshwar"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-[center_10%]"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Eshwar</h3>
                  <p className="text-orange-600 font-semibold">Head Transformation Coach - Fat Loss Specialist</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>4+ years of experience</span>
                  </div>
                  
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                Eshwar serves as Head Transformation Coach, specializing in fat loss and body recomposition. He designs practical training and nutrition strategies that deliver visible, sustainable transformations while maintaining consistency, accountability, and confidence throughout the fitness journey.
                </p>

                

                
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Preview - Hidden */}
      <section id="membership" className="hidden pt-10 pb-10 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Our Membership</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Choose Your Fitness Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From beginner-friendly classes to advanced training programs, we have something for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
            {/* Standard Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/standard.jpg"
                  alt="Standard Plan - Individual Fitness Training"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Dumbbell className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">Standard Plan</CardTitle>
                <CardDescription className="text-base">
                  Build muscle and increase strength with our comprehensive weight training programs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="text-2xl font-bold text-gray-900">₹9,999</div>
                    <div className="text-sm text-gray-600 mt-1">3 months</div>
                  </div>
                  <div className="text-center p-3 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="text-2xl font-bold text-gray-900">₹17,999</div>
                    <div className="text-sm text-gray-600 mt-1">6 months</div>
                    <div className="text-sm font-semibold text-green-600 mt-1">(Save ₹2,000)</div>
                  </div>
                </div>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Personalized Diet Plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Personalized Workout Plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Weekly check-ins</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">One-on-one review calls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">WhatsApp and Call support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Initial workout correction guidance</span>
                  </li>
                </ul>
                <div className="mt-auto pt-4">
                  <Link 
                    href="https://whatsform.com/y7nger"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Join Standard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/premium.jpg"
                  alt="Premium Plan - Advanced Fitness Training"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Premium Plan</CardTitle>
                <CardDescription className="text-base">
                  High-intensity interval training for maximum calorie burn and cardiovascular health.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border border-green-200 rounded-lg bg-green-50">
                    <div className="text-2xl font-bold text-gray-900">₹14,999</div>
                    <div className="text-sm text-gray-600 mt-1">3 months</div>
                  </div>
                  <div className="text-center p-3 border border-green-200 rounded-lg bg-green-50">
                    <div className="text-2xl font-bold text-gray-900">₹26,999</div>
                    <div className="text-sm text-gray-600 mt-1">6 months</div>
                    <div className="text-sm font-semibold text-green-600 mt-1">(Save ₹3,000)</div>
                  </div>
                </div>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Includes everything from the Standard Plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Daily meal photo tracking (clients submit every meal)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Habit tracker</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Specialized habit & lifestyle issue fixing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Dedicated doctor support</span>
                  </li>
                </ul>
                <div className="mt-auto pt-4">
                  <Link 
                    href="https://whatsform.com/y7nger"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Join Premium
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Couple Plan */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/couple.jpg"
                  alt="Couple Plan - Partner Fitness Training"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Couple Plan</CardTitle>
                <CardDescription className="text-base">
                  Find balance and flexibility with our yoga classes and wellness programs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="text-2xl font-bold text-gray-900">₹24,999</div>
                    <div className="text-sm text-gray-600 mt-1">3 months</div>
                  </div>
                  <div className="text-center p-3 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="text-2xl font-bold text-gray-900">₹47,999</div>
                    <div className="text-sm text-gray-600 mt-1">6 months</div>
                    <div className="text-sm font-semibold text-green-600 mt-1">(Save ₹6,000)</div>
                  </div>
                </div>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Couple Standard Plan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Couple Premium Plan</span>
                  </li>
                </ul>
                <div className="mt-auto pt-4">
                  <Link 
                    href="https://whatsform.com/y7nger"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Join Couple
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Elite Plan Section */}
      <section id="elite" className="pt-10 pb-10 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Elite Plan</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Elite Fitness Programs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Daily accountability, enforced discipline, and fast corrections. Built for serious results.
            </p>
            <div className="flex justify-center mt-6">
              <Link href="https://whatsform.com/y7nger" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Join Elite Program
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
            {/* Elite Plan Card 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Weakness-Driven Training System</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Training is designed after identifying your mobility limits, strength gaps, imbalances, and goals.
We don’t train what you like. We fix what’s holding you back - from the core.

                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Advanced strength & intensity tracking</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Daily accountability, enforced discipline, and fast corrections. Built for serious results.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Weekly review & course correction</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Results are reviewed every week. Mistakes are corrected, weak execution is addressed, and next-week actions are set clearly.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 4 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">⁠Every meal tracked, every day</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  All meals must be uploaded daily. Miss a meal, delay a log, or guess portions — you explain. No blind dieting.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 5 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Daily accountability & discipline enforcement</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Steps, sleep, hydration, training, and recovery are monitored daily. Patterns don't slip unnoticed. Excuses don't pass. Corrections happen immediately.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 6 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">⁠Habit & lifestyle correction at root level</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  We don't treat symptoms like low energy or inconsistency. We eliminate the habits causing them - permanently.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 7 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Medical-level support when needed</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Digestive issues, fatigue, recovery problems, or health red flags are addressed with professional oversight. Health is managed, not ignored.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 8 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Priority support & fast intervention</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  When you go off track, you don't wait. We step in immediately to prevent damage and reset execution.
                </p>
              </CardContent>
            </Card>

            {/* Elite Plan Card 9 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Complete Workout Technique Correction</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Every exercise is reviewed and corrected. We continue correcting your form until you perform each movement safely and confidently - with mastery
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="https://whatsform.com/y7nger" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Join Elite Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Standard Plan Section */}
      <section id="standard" className="pt-10 pb-10 bg-[#F9FAFB] scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            
            <h2 className="text-4xl font-bold text-gray-900">Standard Membership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Structured guidance with weekly reviews. Ideal for self-disciplined individuals who can execute independently.
            </p>
            <div className="flex justify-center mt-6">
              <Link href="https://whatsform.com/y7nger" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Join Standard Program
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
            {/* Standard Plan Card 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Personalized Diet Plan</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Simple, sustainable nutrition tailored to your body, lifestyle, and food preferences.
                </p>
              </CardContent>
            </Card>

            {/* Standard Plan Card 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Personalized Workout Plan</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Training designed around your goal, experience level, and schedule to build muscle and improve strength safely.
                </p>
              </CardContent>
            </Card>

            {/* Standard Plan Card 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">Weekly Check-ins</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Progress is reviewed weekly to ensure you’re moving in the right direction.
                </p>
              </CardContent>
            </Card>

            {/* Standard Plan Card 4 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-[#FF6F00] hover:border-[#FF6F00] flex flex-col min-h-[200px]">
              <CardHeader className="pb-6 px-6 pt-6 min-h-[100px] flex flex-col justify-start">
                <CardTitle className="text-2xl text-[#FF6F00]">WhatsApp & Call Support</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 px-6 pb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                Direct access for questions, guidance, and general support when needed.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="https://whatsform.com/y7nger" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Join Standard Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section id="reviews" className="py-20 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900">What Our Members Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who have transformed their lives at FitneX.
            </p>
          </div>

          <ReviewsCarousel />

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <Link href="/reviews">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-orange-600 to-red-600 scroll-mt-16">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready for Transformation?</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              
              
              <Link 
                href="https://whatsform.com/y7nger" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/Digital_Inline_White.svg"
                  alt="Chat on WhatsApp"
                  width={240}
                  height={240}
                  className="h-156 w-156 md:h-164 md:w-164"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
