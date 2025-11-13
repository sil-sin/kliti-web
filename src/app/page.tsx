'use client'
import Hero from '@/components/hero/hero'
import CategoryGalleries from '@/components/category-galleries/category-galleries'

export default function Home() {
  return (
    <div className="bg-gray-50">
      <main>
        <Hero />
        <CategoryGalleries />
      </main>
    </div>
  )
}
