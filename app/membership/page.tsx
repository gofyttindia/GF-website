import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header, Footer } from "@/components/layout"
import { Check, X, Star, Clock, Users, Dumbbell } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  const plans = [
    {
      name: "Basic",
      price: 29,
      period: "month",
      description: "Perfect for getting started with your fitness journey",
      popular: false,
      features: [
        "24/7 gym access",
        "Cardio and strength equipment",
        "Locker room access",
        "Free fitness assessment",
        "Mobile app access",
      ],
      notIncluded: [
        "Group fitness classes",
        "Personal training sessions",
        "Nutrition coaching",
        "Guest passes",
        "Towel service",
      ],
    },
    {
      name: "Premium",
      price: 59,
      period: "month",
      description: "Our most popular plan with everything you need",
      popular: true,
      features: [
        "Everything in Basic",
        "Unlimited group fitness classes",
        "2 personal training sessions/month",
        "Nutrition consultation",
        "Guest passes (2/month)",
        "Towel service",
        "Recovery zone access",
        "Nutrition bar discounts",
      ],
      notIncluded: ["Unlimited personal training", "Massage therapy"],
    },
    {
      name: "Elite",
      price: 99,
      period: "month",
      description: "Ultimate fitness experience with premium perks",
      popular: false,
      features: [
        "Everything in Premium",
        "Unlimited personal training",
        "Priority class booking",
        "Massage therapy (1/month)",
        "Unlimited guest passes",
        "Premium locker rental",
        "Nutrition coaching program",
        "Exclusive member events",
        "Supplement discounts",
      ],
      notIncluded: [],
    },
  ]

  const addOns = [
    {
      name: "Personal Training Session",
      price: 75,
      description: "One-on-one training with certified trainer",
    },
    {
      name: "Nutrition Coaching",
      price: 150,
      period: "month",
      description: "Personalized meal plans and ongoing support",
    },
    {
      name: "Massage Therapy",
      price: 90,
      description: "60-minute therapeutic massage session",
    },
    {
      name: "Premium Locker",
      price: 25,
      period: "month",
      description: "Large locker with premium amenities",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Membership Plans</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Choose Your
              <span className="text-orange-600"> Fitness Plan</span>
            </h1>
            <p className="text-xl text-gray-600">
              Flexible membership options designed to fit your lifestyle and budget. Start your transformation today
              with no long-term contracts.
            </p>
            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">No contracts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">First week free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-2 border-orange-500 shadow-xl scale-105"
                    : "border border-gray-200 hover:shadow-lg"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3 opacity-50">
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    size="lg"
                  >
                    <Link href="/contact">{plan.popular ? "Start Free Trial" : "Choose Plan"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Add-Ons</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Enhance Your Experience</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take your fitness journey to the next level with our premium add-on services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                  <div className="text-3xl font-bold text-orange-600">
                    ${addon.price}
                    {addon.period && <span className="text-lg text-gray-600">/{addon.period}</span>}
                  </div>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Member Benefits</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Why Choose FitCore</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">24/7 Access</h3>
                <p className="text-gray-600">Work out on your schedule with round-the-clock facility access.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Expert Trainers</h3>
                <p className="text-gray-600">Get guidance from certified professionals who care about your success.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Dumbbell className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Premium Equipment</h3>
                <p className="text-gray-600">
                  Train with state-of-the-art equipment that's always clean and maintained.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="mx-auto bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Star className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                <p className="text-gray-600">
                  Join a supportive community that motivates and celebrates your progress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel my membership anytime?</h3>
                <p className="text-gray-600">
                  Yes! We don't believe in long-term contracts. You can cancel your membership at any time with 30 days
                  notice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a joining fee?</h3>
                <p className="text-gray-600">
                  No joining fees! We believe fitness should be accessible. Just pay your first month and start your
                  journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I freeze my membership?</h3>
                <p className="text-gray-600">
                  Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended
                  travel.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer family discounts?</h3>
                <p className="text-gray-600">
                  Families of 3+ members receive a 15% discount on all memberships. Contact us for details.
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Transform Your Life?</h2>
            <p className="text-xl text-orange-100">
              Start your fitness journey today with our risk-free trial. No contracts, no pressure, just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/contact">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/contact">Schedule Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
