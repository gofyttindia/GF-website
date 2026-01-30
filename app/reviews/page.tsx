import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header, Footer } from "@/components/layout"
import { Star, Quote, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Srikanth",
      rating: 5,
      program: "Strength Training",
      review: "I joined this online coaching to stay consistent, and it really helped me. The workouts were simple, the diet was practical, and the support was constant. I started seeing real changes in my body and mindset. Thank you Eshwar for guiding. I lost 13kg and looking good now.",
    },
    {
      name: "Sumanth",
      rating: 5,
      program: "Personal Training",
      review: "No extreme diets or complicated workouts. Everything was easy to follow and suited my routine. I feel stronger & confident , I love there responses and doubt solving , happy to choose you guys. Dropped 8kg weight",
    },
    {
      name: "Sai Prasad",
      rating: 5,
      program: "Yoga & Wellness",
      review: "I joined this online coaching at 68 kg and in just 4 months I reached 57 kg in a healthy way. The training and diet were simple, practical, and easy to follow.",
    },
    {
      name: "Sameer",
      rating: 5,
      program: "HIIT Classes",
      review: "I started this online coaching at 104 kg and in just 4 months I came down to 88 kg. The diet and workouts were practical and flexible for my lifestyle.",
    },
    {
      name: "Hari Krishna",
      rating: 5,
      program: "Group Fitness",
      review: "First thing I like they way of teaching , supporting and weekly check is helped me to transform my self , I like diet chat because it is under budget and easy to prepare also I got quick results in 6 months i have seen my abs.",
    },
    {
      name: "Rohit",
      rating: 5,
      program: "Nutrition Coaching",
      review: "Coach Gowrav Reddy has been extremely helpful and motivating throughout my fitness journey. The workouts, diet plans, and continuous support made this a very positive and successful experience.",
    },
    {
      name: "P.Akhil",
      rating: 5,
      program: "Strength Training",
      review: " i am extremely happy with the results i have experienced. I enrolled myself in this program and took diet plan under my coach Eshwar brother and Head coach Shiva Brother. Thankyou fitnex team 🫶",
    },
    {
      name: "Nishanth Reddy",
      rating: 5,
      program: "Personal Training",
      review: "Really happy with both coach and co-coach's help and support in workout and diet plans. Also satisfied with regular calls and progress check-ins which helped me stay motivated and work harder.",
    },
    {
      name: "Surya",
      rating: 5,
      program: "Premium Plan",
      review: "Asif anna's response super ..!!!Quick response avasaram ayithe call ki respond avutaru ..very good 100/100 rating",
    },
    {
      name: "Adithya",
      rating: 5,
      program: "Standard Plan",
      review: "I have been consistently training under the man of discipline Mr.GowravReddy Anna its been since 2years i have got seen good results. The workouts that i have got is very effective and i have increased a good amount of strength. Consistency Discipline gave me everything a very good consistently. Not only a Coach more than that 🫂💗",
    },
    {
      name: "Sravan Byreddy",
      rating: 5,
      program: "HIIT Classes",
      review: "Joining this program was one of the best decisions I made. The guidance, clear explanations, and continuous support made everything easy to follow. Weekly check-ins kept me accountable and motivated. The diet plan was simple, budget-friendly, and practical for daily life.",
    },
    {
      name: "Ravi",
      rating: 5,
      program: "Strength Training",
      review: "Response wise chala boundhi brother Elanti doubts una clear chesthadu and takes care alott even in regular days also. He will be pushing alott to give more better results. Nakkana ekkuva manodu ekkuva happy avthauntundu in terms of result.",
    },
    {
      name: "Sai",
      rating: 5,
      program: "Premium Plan",
      review: " Challa baga detailed gaa kanukuntunaru, manchi ga encourage chesthu ani explain chesthunaru diet kani workouts kani ani manchi ga follow up chesthunaru, 15 kgs thaganu bro total gaa without any health issues challa active ga untunanu not only weigh loss bro lifestyle kuda change iendhi very happy for you and your team bro",
    },
    {
      name: "Pavan Parthu",
      rating: 5,
      program: "Standard Plan",
      review: "very flexible diet plans. And motivate me very much whenever I get depressed about my physique And results too, now I’m confident that I can get a good physique",
    },
    // {
    //   name: "Arjun",
    //   rating: 5,
    //   program: "Personal Training",
    //   review: "Coach Gowrav's lifestyle coaching approach changed everything for me. Not just about workouts, but building sustainable habits. Lost 14 kgs and completely transformed my lifestyle.",
    // },
    // {
    //   name: "Divya",
    //   rating: 5,
    //   program: "Couple Plan",
    //   review: "My husband and I joined together. Best decision ever! We both lost weight together and supported each other. The couple plan is perfect for partners who want to get fit together.",
    // },
    // {
    //   name: "Suresh",
    //   rating: 5,
    //   program: "Strength Training",
    //   review: "From 110 kgs to 88 kgs in 7 months. The personalized approach and constant support made all the difference. Coach Eshwar's fat loss strategies really worked for me.",
    // },
    // {
    //   name: "Kavya",
    //   rating: 5,
    //   program: "Premium Plan",
    //   review: "The daily meal photo tracking feature kept me honest and accountable. Lost 16 kgs in 6 months. The habit tracker helped me identify and fix my lifestyle issues. Amazing program!",
    // },
    // {
    //   name: "Rajesh",
    //   rating: 5,
    //   program: "Standard Plan",
    //   review: "Started my fitness journey with FitneX and couldn't be happier. Lost 13 kgs, gained muscle, and feel amazing. The WhatsApp support is always available when I need help.",
    // },
  ]

  const averageRating = 4.9
  const totalReviews = 847

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-orange-100 text-orange-800">Member Reviews</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              What Our Members
              <span className="text-orange-600"> Are Saying</span>
            </h1>
            <p className="text-xl text-gray-600">
              Real stories from real people who have transformed their lives at FitneX. Join thousands of satisfied
              members who have achieved their fitness goals.
            </p>

            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-3xl font-bold text-gray-900">{averageRating}</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{totalReviews.toLocaleString()}</div>
                <div className="text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">Recommend Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 h-full relative flex flex-col hover:shadow-lg transition-shadow">
                <div className="absolute top-4 right-4">
                  <Quote className="h-8 w-8 text-orange-200" />
                </div>
                <CardContent className="space-y-4 p-0 flex flex-col flex-1">
                  <div className="pb-4 border-b border-gray-100">
                    <div className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{review.name}</span>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mt-auto">"{review.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Review Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Review Breakdown</Badge>
            <h2 className="text-4xl font-bold text-gray-900">What Members Love Most</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="text-4xl font-bold text-orange-600">96%</div>
                <h3 className="text-lg font-semibold text-gray-900">Trainer Quality</h3>
                <p className="text-gray-600">Love their personal trainers</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="text-4xl font-bold text-green-600">94%</div>
                <h3 className="text-lg font-semibold text-gray-900">Facility Cleanliness</h3>
                <p className="text-gray-600">Rate facilities as excellent</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="text-4xl font-bold text-purple-600">92%</div>
                <h3 className="text-lg font-semibold text-gray-900">Community Feel</h3>
                <p className="text-gray-600">Feel part of the community</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4 p-0">
                <div className="text-4xl font-bold text-red-600">98%</div>
                <h3 className="text-lg font-semibold text-gray-900">Would Recommend</h3>
                <p className="text-gray-600">Recommend to friends</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-12 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <ThumbsUp className="h-8 w-8 text-orange-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Share Your Experience</h2>
                </div>
                <p className="text-xl text-gray-600">
                  Are you a FitneX member? We'd love to hear about your fitness journey and how we've helped you
                  achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Leave a Review
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-orange-100">
              Join the hundreds of members who have transformed their lives at FitneX. Your journey starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/membership">Start Your Journey</Link>
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
