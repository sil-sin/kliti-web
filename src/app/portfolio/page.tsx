'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// TODO: Fetch from Contentful CMS
const categories = [
  'All',
  'Weddings',
  'Birthdays',
  'Events',
  'Portraits',
  'Video Clips',
  'Musical Productions',
  'Advertisements',
  'Corporate'
]

// Placeholder data - replace with Contentful API call
const portfolioItems = [
  {
    id: 1,
    title: 'Wedding Photography',
    category: 'Weddings',
    description: 'Capturing the essence of love.',
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 2,
    title: 'Birthday Party',
    category: 'Birthdays',
    description: 'Memorable celebration moments.',
    color: 'from-orange-400 to-amber-500'
  },
  {
    id: 3,
    title: 'Music Video Production',
    category: 'Video Clips',
    description: 'Professional music video shoots.',
    color: 'from-purple-400 to-violet-500'
  },
  {
    id: 4,
    title: 'Corporate Event',
    category: 'Corporate',
    description: 'Professional corporate photography.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 5,
    title: 'Portrait Session',
    category: 'Portraits',
    description: 'Timeless portrait photography.',
    color: 'from-teal-400 to-cyan-500'
  },
  {
    id: 6,
    title: 'Musical Production',
    category: 'Musical Productions',
    description: 'Dynamic music event coverage.',
    color: 'from-red-400 to-pink-500'
  },
  {
    id: 7,
    title: 'Advertisement Campaign',
    category: 'Advertisements',
    description: 'High-impact commercial photography.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 8,
    title: 'Special Event',
    category: 'Events',
    description: 'Memorable event photography.',
    color: 'from-green-400 to-emerald-500'
  }
]

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-lg text-gray-600">
            Explore our work across various photography and videography
            categories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} flex items-center justify-center`}
                  >
                    <div className="text-white text-center">
                      <div className="text-5xl font-bold opacity-20 mb-2">
                        {item.category.charAt(0)}
                      </div>
                      <div className="text-sm opacity-70">{item.category}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-semibold uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No items found in this category.</p>
            </div>
          )}
        </div>

        {/* CMS Integration Note */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Portfolio content should be managed through
            Contentful CMS. Update the Contentful space with Gallery content
            models including title, category, description, and images.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
