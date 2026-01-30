'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { transformations } from "@/data/transformations"

export function TransformationsCarousel() {
  const [showAll, setShowAll] = useState(false)
  const displayedTransformations = showAll ? transformations : transformations.slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTransformations.map((transformation, index) => (
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
      {!showAll && transformations.length > 3 && (
        <div className="text-center mt-8">
          <Link href="/transformations">
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              See More Transformations
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

