import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header, Footer } from "@/components/layout"
import { Award, Star, Users, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet Our Expert Trainers',
  description: 'Meet our certified fitness professionals including Shiva, Gowrav Reddy, and Eshwar. Expert trainers specializing in competition prep, lifestyle coaching, and transformation.',
  openGraph: {
    title: 'Meet Our Expert Trainers | FitneX',
    description: 'Meet our certified fitness professionals specializing in competition prep, lifestyle coaching, and transformation.',
  },
}

export default function TrainersPage() {
  const trainers = [
    {
      name: "Sarah Mitchell",
      specialty: "Strength Training & Powerlifting",
      experience: "8 years",
      certifications: ["NASM-CPT", "CSCS", "Powerlifting Coach"],
      bio: "Sarah specializes in helping clients build serious strength and confidence. Former competitive powerlifter with a passion for teaching proper form and progressive overload.",
      image: "/placeholder.svg?height=400&width=300&text=Sarah+Mitchell",
      rating: 4.9,
      sessions: 2500,
    },
    {
      name: "Marcus Johnson",
      specialty: "HIIT & Functional Training",
      experience: "6 years",
      certifications: ["ACSM-CPT", "TRX Certified", "Kettlebell Specialist"],
      bio: "Marcus brings high energy and motivation to every session. Expert in functional movements that translate to real-world strength and athleticism.",
      image: "/placeholder.svg?height=400&width=300&text=Marcus+Johnson",
      rating: 4.8,
      sessions: 1800,
    },
    {
      name: "Emily Chen",
      specialty: "Yoga & Mindfulness",
      experience: "10 years",
      certifications: ["RYT-500", "Meditation Teacher", "Prenatal Yoga"],
      bio: "Emily combines traditional yoga practices with modern wellness techniques. Specializes in stress reduction and mind-body connection.",
      image: "/placeholder.svg?height=400&width=300&text=Emily+Chen",
      rating: 5.0,
      sessions: 3200,
    },
    {
      name: "David Rodriguez",
      specialty: "Personal Training & Weight Loss",
      experience: "7 years",
      certifications: ["NASM-CPT", "Nutrition Coach", "Corrective Exercise"],
      bio: "David has helped hundreds of clients achieve their weight loss goals through personalized training and nutrition guidance. Known for his patient and encouraging approach.",
      image: "/placeholder.svg?height=400&width=300&text=David+Rodriguez",
      rating: 4.9,
      sessions: 2100,
    },
    {
      name: "Jessica Park",
      specialty: "Group Fitness & Dance",
      experience: "5 years",
      certifications: ["Group Fitness Instructor", "Zumba Certified", "Barre Instructor"],
      bio: "Jessica brings fun and energy to every group class. Former professional dancer who makes fitness feel like a party while delivering serious results.",
      image: "/placeholder.svg?height=400&width=300&text=Jessica+Park",
      rating: 4.8,
      sessions: 1500,
    },
    {
      name: "Alex Thompson",
      specialty: "Sports Performance & Recovery",
      experience: "9 years",
      certifications: ["CSCS", "Sports Massage Therapist", "Movement Specialist"],
      bio: "Alex works with athletes and active individuals to optimize performance and prevent injuries. Expert in movement analysis and recovery protocols.",
      image: "/placeholder.svg?height=400&width=300&text=Alex+Thompson",
      rating: 4.9,
      sessions: 2800,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Our Team</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Meet Your
              <span className="text-orange-600"> Expert Trainers</span>
            </h1>
            <p className="text-xl text-gray-600">
              Our certified fitness professionals are here to guide, motivate, and support you every step of the way.
              Each trainer brings unique expertise and a passion for helping you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{trainer.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{trainer.name}</h3>
                    <p className="text-orange-600 font-semibold">{trainer.specialty}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{trainer.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{trainer.sessions.toLocaleString()} sessions</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{trainer.bio}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Certifications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trainer.certifications.map((cert, certIndex) => (
                        <Badge key={certIndex} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link href="/contact">Book Session</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Trainers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900">What Makes Our Trainers Special</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Certified Experts</h3>
                <p className="text-gray-600">
                  All trainers hold nationally recognized certifications and continue their education regularly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personalized Approach</h3>
                <p className="text-gray-600">
                  Every trainer creates customized programs based on your unique goals and fitness level.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Proven Results</h3>
                <p className="text-gray-600">
                  Our trainers have helped thousands of clients achieve their fitness goals and transform their lives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Ongoing Support</h3>
                <p className="text-gray-600">
                  Get continuous motivation, form corrections, and program adjustments throughout your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Work with a Pro?</h2>
            <p className="text-xl text-orange-100">
              Book a consultation with one of our expert trainers and start your transformation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/contact">Book Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/membership">View Training Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
