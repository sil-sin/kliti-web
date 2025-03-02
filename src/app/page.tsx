'use client'
import Hero from '@/components/composed/Hero/Hero'

export default function Home() {
  // const allEntries = await fetchEntries()
  //
  // const firestoreEntries = await fetchCollections()
  // console.log( firestoreEntries)

  return (
    <div className="bg-grey-500">
      <main>
        <Hero />
      </main>
      <footer className="">Footer content</footer>
    </div>
  )
}
