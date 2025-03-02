import { createClient } from 'contentful'

export const contentfulClient = createClient({
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
})
