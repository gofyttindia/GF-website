'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

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
    review: "Really happy with both coach and co-coach’s help and support in workout and diet plans. Also satisfied with regular calls and progress check-ins which helped me stay motivated and work harder.",
  },
]

export function ReviewsCarousel() {
  return (
    <div className="max-w-6xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="p-6 h-full relative flex flex-col">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  )
}


