'use server'
import { contentfulClient } from '../lib/contentful'

export const fetchEntries = async () => {
  const entries = await contentfulClient.getEntries()
  if (entries.items) return entries.items
  console.log(`Error getting entries.`)
  return []
}

export const fetchEntry = async (id: string) => {
  const entry = await contentfulClient.getEntry(id)
  if (entry) return entry
  console.log(`Error getting entry.`)
  return {}
}
