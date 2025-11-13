'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// TODO: Fetch from Contentful CMS
const categories = [
  {
    id: 1,
    name: 'Weddings',
    slug: 'weddings',
    description: 'Timeless wedding photography capturing your special day',
    color: 'from-pink-400 to-rose-500',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `wedding-${i + 1}`,
      alt: `Wedding photo ${i + 1}`
    }))
  },
  {
    id: 2,
    name: 'Birthdays',
    slug: 'birthdays',
    description: 'Memorable birthday celebrations frozen in time',
    color: 'from-orange-400 to-amber-500',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `birthday-${i + 1}`,
      alt: `Birthday photo ${i + 1}`
    }))
  },
  {
    id: 3,
    name: 'Events',
    slug: 'events',
    description:
      'Professional event coverage for corporate and private occasions',
    color: 'from-blue-400 to-indigo-500',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `event-${i + 1}`,
      alt: `Event photo ${i + 1}`
    }))
  },
  {
    id: 4,
    name: 'Video Clips',
    slug: 'video-clips',
    description: 'Cinematic videography that tells your story',
    color: 'from-purple-400 to-violet-500',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `video-${i + 1}`,
      alt: `Video thumbnail ${i + 1}`
    }))
  },
  {
    id: 5,
    name: 'Musical Productions',
    slug: 'musical',
    description: 'Dynamic coverage of music videos and performances',
    color: 'from-red-400 to-pink-500',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `musical-${i + 1}`,
      alt: `Musical production ${i + 1}`
    }))
  },
  {
    id: 6,
    name: 'Advertisements',
    slug: 'ads',
    description: 'High-impact commercial photography and video',
    color: 'from-yellow-400 to-orange-500',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: `ad-${i + 1}`,
      alt: `Advertisement ${i + 1}`
    }))
  }
]

interface CategoryCarouselProps {
  category: (typeof categories)[0]
}

function CategoryCarousel({ category }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
          <p className="text-gray-600">{category.description}</p>
        </div>
        <Link
          href={`/portfolio?category=${category.slug}`}
          className="text-primary hover:text-primary-dark font-semibold transition"
        >
          View All →
        </Link>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -ml-4"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {category.images.map((image, index) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-80 h-60 relative group/item cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} flex items-center justify-center`}
              >
                <div className="text-white text-center">
                  <div className="text-6xl font-bold opacity-20 mb-2">
                    {index + 1}
                  </div>
                  <div className="text-sm opacity-70">{category.name}</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition" />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -mr-4"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </div>
  )
}

export default function CategoryGalleries() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our work across different categories. Each moment tells a
            unique story.
          </p>
        </div>

        {categories.map((category) => (
          <CategoryCarousel key={category.id} category={category} />
        ))}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Create Your Story?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Let's capture your special moments with professional photography and
            videography
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-white text-primary hover:bg-gray-100 font-semibold rounded-lg shadow-lg transition transform hover:scale-105 inline-block"
            >
              Book Your Session
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 font-semibold rounded-lg transition transform hover:scale-105 inline-block"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>

        {/* Note about CMS */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <strong>CMS Integration:</strong> Gallery images should be fetched
          from Contentful. Create a "Gallery" content model with category,
          images, and metadata fields.
        </div>
      </div>
    </section>
  )
}
