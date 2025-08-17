import React from 'react'
import Link from '@/components/ui/link'

export default function Services() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Exceptional Photography for
          <br />
          Every Occasion
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our photography studio specializes in capturing life&apos;s most
          cherished moments. From weddings to celebrations, we bring your vision
          to life with stunning imagery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Weddings: Timeless Memories Captured Beautifully
          </h3>
          <p className="text-sm text-gray-600">
            Let us document your love story with elegance and artistry.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Celebrations: Every Moment Deserves to Shine
          </h3>
          <p className="text-sm text-gray-600">
            From birthdays to anniversaries, we celebrate every milestone.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">
            Videoclips: Relive Your Special Moments
          </h3>
          <p className="text-sm text-gray-600">
            Our videography captures the essence of your events.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link variant="outline" href="/services">
          Learn More
        </Link>
        <Link href="/contact">
          Sign up
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  )
}
