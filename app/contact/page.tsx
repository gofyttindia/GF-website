import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header, Footer } from "@/components/layout"
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Get In Touch</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Let's Start Your
              <span className="text-orange-600"> Fitness Journey</span>
            </h1>
            <p className="text-xl text-gray-600">
              Ready to transform your life? We're here to help you every step of the way. Contact us today to schedule
              your free consultation and facility tour.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Schedule a Tour</h3>
                <p className="text-gray-600">Visit our facility and see what makes FitCore special</p>
                <Button className="bg-orange-600 hover:bg-orange-700">Book Tour</Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Free Consultation</h3>
                <p className="text-gray-600">Meet with a trainer to discuss your fitness goals</p>
                <Button className="bg-green-600 hover:bg-green-700">Book Consultation</Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Ask Questions</h3>
                <p className="text-gray-600">Get answers about memberships, programs, and more</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Send Message</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Us Today</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Come see our state-of-the-art facility and meet our team. We're here to help you succeed.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Location</h3>
                    <p className="text-gray-600">123 Fitness Street</p>
                    <p className="text-gray-600">Wellness City, WC 12345</p>
                    <Button variant="link" className="p-0 h-auto text-orange-600 hover:text-orange-700">
                      Get Directions
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                    <Link 
                      href="https://wa.me/917702608961" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      +91 98765 43210
                    </Link>
                    <p className="text-gray-500 text-sm">Click to chat on WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                    <p className="text-gray-600">info@fitcore.com</p>
                    <p className="text-gray-500 text-sm">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Hours</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>
                        <span className="font-medium">Gym Access:</span> 24/7 for Members
                      </p>
                      <p>
                        <span className="font-medium">Staff Hours:</span>
                      </p>
                      <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                      <p>Saturday - Sunday: 8:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name *</label>
                      <Input placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name *</label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email *</label>
                    <Input type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input type="tel" placeholder="(555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">I'm interested in *</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                      <option value="">Select an option</option>
                      <option value="membership">Membership Information</option>
                      <option value="personal-training">Personal Training</option>
                      <option value="group-classes">Group Classes</option>
                      <option value="nutrition">Nutrition Coaching</option>
                      <option value="tour">Facility Tour</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message *</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Tell us about your fitness goals and how we can help you..."
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newsletter" className="rounded border-gray-300" />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      I'd like to receive fitness tips and updates via email
                    </label>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-orange-100 text-orange-800">Find Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Our Location</h2>
            <p className="text-xl text-gray-600">
              Conveniently located in the heart of Wellness City with plenty of parking.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="text-gray-600">Interactive map would be embedded here</p>
                <p className="text-sm text-gray-500">123 Fitness Street, Wellness City, WC 12345</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Get Started?</h2>
            <p className="text-xl text-orange-100">
              Don't wait another day to start your fitness journey. Contact us now and take the first step toward a
              healthier, stronger you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 bg-transparent"
                asChild
              >
                <Link 
                  href="https://wa.me/917702608961" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  Chat on WhatsApp: +91 98765 43210
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
