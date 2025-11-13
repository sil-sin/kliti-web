'use client'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Hero: FC = () => {
  //TODO add hero contentful data
  const router = useRouter()

  return (
    <div className="relative bg-gray-900 h-[600px] flex items-center overflow-hidden">
      <Image
        src="/hero_cover.jpg"
        alt="Stunning hero banner showcasing our photography"
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover brightness-90"
        onError={(e) => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/60 to-black/80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
          Capturing Life's
          <br />
          <span className="text-primary-light">Precious Moments</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
          Professional photography and videography for weddings, events,
          portraits, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push('/portfolio')}
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            View Our Work
          </button>
          <button
            onClick={() => router.push('/book')}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Book a Session
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm text-gray-300">Events Covered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-sm text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-sm text-gray-300">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-sm text-gray-300">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Hero
