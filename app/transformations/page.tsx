'use client'

import { Header, Footer } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { transformations } from "@/data/transformations"

export default function TransformationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Transformations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">Transformations</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Real Results, Real People</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the incredible transformations our members have achieved through dedication and our expert guidance.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformations.map((transformation, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={transformation.image}
                      alt={`${transformation.name} - Transformation`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{transformation.name}</h3>
                    <p className="text-base text-orange-600 font-semibold mb-2">{transformation.beforeAfter}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

