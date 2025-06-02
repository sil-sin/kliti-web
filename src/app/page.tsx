'use client'
import Hero from '@/components/hero/hero'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="bg-grey-500">
      <main>
        <Hero />
      </main>
      <footer className="">Footer content</footer>
    </div>
  )
}
