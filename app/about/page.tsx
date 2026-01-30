import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header, Footer } from "@/components/layout"
import { Clock, Users, Target, Award, Heart, Zap, Shield, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-orange-100 text-orange-800">About FitCore</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Your Fitness Journey
                <span className="text-orange-600"> Starts Here</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                For over 10 years, FitCore has been the premier fitness destination, helping thousands achieve their
                health and wellness goals. Our state-of-the-art facility, expert trainers, and supportive community
                create the perfect environment for transformation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-900">Flexible Hours</span>
                  </div>
                  <p className="text-gray-600">Open 24/7 for your convenience</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-900">Expert Trainers</span>
                  </div>
                  <p className="text-gray-600">Certified professionals to guide you</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=Modern+Gym+Interior"
                alt="Modern gym interior"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Our Mission</Badge>
            <h2 className="text-4xl font-bold text-gray-900">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe fitness is not just about physical transformation—it's about building confidence, creating
              community, and empowering people to live their best lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Passion</h3>
                <p className="text-gray-600">
                  We're passionate about helping you discover your strength and achieve goals you never thought
                  possible.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                <p className="text-gray-600">
                  Our supportive community creates lasting friendships and accountability partnerships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in equipment, training, and customer service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  We continuously evolve our programs and technology to provide the best fitness experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Our Impact</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Numbers That Matter</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-orange-600">10+</div>
              <div className="text-xl font-semibold text-gray-900">Years of Excellence</div>
              <div className="text-gray-600">Serving the community since 2014</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-green-600">5000+</div>
              <div className="text-xl font-semibold text-gray-900">Members Transformed</div>
              <div className="text-gray-600">Lives changed through fitness</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-purple-600">50+</div>
              <div className="text-xl font-semibold text-gray-900">Expert Trainers</div>
              <div className="text-gray-600">Certified fitness professionals</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-red-600">98%</div>
              <div className="text-xl font-semibold text-gray-900">Satisfaction Rate</div>
              <div className="text-gray-600">Members love their experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Our Facilities</Badge>
            <h2 className="text-4xl font-bold text-gray-900">State-of-the-Art Equipment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our 15,000 square foot facility features the latest fitness equipment and amenities to support every
              aspect of your wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Weight+Room"
                  alt="Weight Room"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weight Training Area</h3>
                <p className="text-gray-600">
                  Premium free weights, Olympic platforms, and cutting-edge strength training machines.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Cardio+Zone"
                  alt="Cardio Zone"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cardio Zone</h3>
                <p className="text-gray-600">
                  Treadmills, ellipticals, bikes, and rowing machines with entertainment systems.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Group+Fitness+Studio"
                  alt="Group Fitness Studio"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Fitness Studios</h3>
                <p className="text-gray-600">
                  Spacious studios with professional sound systems for classes and group training.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Locker+Rooms"
                  alt="Locker Rooms"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Locker Rooms</h3>
                <p className="text-gray-600">
                  Clean, spacious locker rooms with showers, towel service, and personal care amenities.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Recovery+Zone"
                  alt="Recovery Zone"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Recovery Zone</h3>
                <p className="text-gray-600">
                  Stretching area, foam rollers, massage chairs, and recovery tools for post-workout care.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Juice+Bar"
                  alt="Juice Bar"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nutrition Bar</h3>
                <p className="text-gray-600">
                  Fresh smoothies, protein shakes, and healthy snacks to fuel your workouts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Recognition</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Awards & Achievements</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Best Gym 2023</h3>
                <p className="text-gray-600">City Fitness Awards</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">5-Star Rating</h3>
                <p className="text-gray-600">Google Reviews</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Safety Certified</h3>
                <p className="text-gray-600">Health Department</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Community Choice</h3>
                <p className="text-gray-600">Local Business Awards</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Join Our Community?</h2>
            <p className="text-xl text-orange-100">
              Experience the FitCore difference. Schedule a tour and see why we're the #1 choice for fitness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/contact">Schedule a Tour</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/membership">View Membership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
