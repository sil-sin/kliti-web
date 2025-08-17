'use client'
import Hero from '@/components/hero/hero'
import Services from '@/components/services/services'

export default function Home() {
  return (
    <div className="bg-grey-500">
      <main>
        <Hero />
        <Services />
      </main>
      <footer className="">Footer content</footer>
    </div>
  )
}
