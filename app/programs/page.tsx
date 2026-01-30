import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header, Footer } from "@/components/layout"
import { Dumbbell, Users, Target, CheckCircle, Clock, Calendar, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fitness Programs',
  description: 'Choose from Standard, Premium, and Couple fitness plans. Personalized diet and workout plans, expert guidance, and flexible pricing options.',
  openGraph: {
    title: 'Fitness Programs | FitneX',
    description: 'Choose from Standard, Premium, and Couple fitness plans. Personalized diet and workout plans.',
  },
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Our Programs</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Find Your Perfect
              <span className="text-orange-600"> Fitness Program</span>
            </h1>
            <p className="text-xl text-gray-600">
              Whether you're a beginner or an experienced athlete, we have the right program to help you achieve your
              goals.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Strength Training */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Strength+Training"
                  alt="Strength Training"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Dumbbell className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">Strength Training</CardTitle>
                <CardDescription className="text-base">
                  Build muscle and increase strength with our comprehensive weight training programs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span>45-60 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span>All Levels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span>Daily Classes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-orange-600" />
                    <span>Certified Trainers</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Personal training sessions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Custom workout plans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Nutrition guidance</span>
                  </li>
                </ul>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Link href="/membership">Join Program</Link>
                </Button>
              </CardContent>
            </Card>

            {/* HIIT Classes */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=HIIT+Classes"
                  alt="HIIT Classes"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">HIIT Classes</CardTitle>
                <CardDescription className="text-base">
                  High-intensity interval training for maximum calorie burn and cardiovascular health.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>30-45 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span>All Levels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>6x per week</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-green-600" />
                    <span>Group Energy</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Group fitness classes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Fat burning focus</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Cardio improvement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Metabolic boost</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/membership">Join Program</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Yoga & Wellness */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Yoga+Wellness"
                  alt="Yoga & Wellness"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Yoga & Wellness</CardTitle>
                <CardDescription className="text-base">
                  Find balance and flexibility with our yoga classes and wellness programs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>60-90 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Beginner+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Daily Classes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-purple-600" />
                    <span>Mind-Body</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Multiple yoga styles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Meditation sessions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Stress relief focus</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Flexibility training</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/membership">Join Program</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Personal Training */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Personal+Training"
                  alt="Personal Training"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Trophy className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl">Personal Training</CardTitle>
                <CardDescription className="text-base">
                  One-on-one training sessions tailored to your specific goals and needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span>60 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-600" />
                    <span>1-on-1</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span>Flexible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-red-600" />
                    <span>Premium</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Customized workouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Dedicated trainer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Goal-specific training</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Nutrition coaching</span>
                  </li>
                </ul>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/contact">Book Consultation</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Functional Fitness */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-200">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Functional+Fitness"
                  alt="Functional Fitness"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-teal-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Target className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-2xl">Functional Fitness</CardTitle>
                <CardDescription className="text-base">
                  Train movements that help you perform daily activities with ease and efficiency.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-teal-600" />
                    <span>45 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-teal-600" />
                    <span>Small Groups</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span>5x per week</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-teal-600" />
                    <span>Real-world</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Movement patterns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Core stability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Balance training</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Injury prevention</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/membership">Join Program</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Nutrition Coaching */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-200">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Nutrition+Coaching"
                  alt="Nutrition Coaching"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors -mt-8 relative z-10 border-4 border-white">
                  <Target className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-2xl">Nutrition Coaching</CardTitle>
                <CardDescription className="text-base">
                  Learn how to fuel your body properly with personalized nutrition guidance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>Ongoing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-yellow-600" />
                    <span>Individual</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span>Weekly Check-ins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span>Certified</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Meal planning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Macro tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Supplement guidance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">Lifestyle coaching</span>
                  </li>
                </ul>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Link href="/contact">Book Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Get Started?</h2>
            <p className="text-xl text-orange-100">
              Choose your program and start your fitness journey today. First week is on us!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/membership">View Membership Options</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/contact">Schedule a Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
