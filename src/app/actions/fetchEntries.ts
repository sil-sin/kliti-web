'use server'
import { contentfulClient } from '../lib/contentful'

export const fetchEntries = async () => {
  const entries = await contentfulClient.getEntries()
  if (entries.items) return entries.items
  console.log(`Error getting entries.`)
  return []
}
