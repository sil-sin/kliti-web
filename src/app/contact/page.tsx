import { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us - Kliti Photography',
  description: 'Get in touch with Kliti Photography for quotes and inquiries. Contact us via WhatsApp or our contact form.',
  keywords: ['contact', 'photography', 'quote', 'inquiry', 'kliti photography'],
  openGraph: {
    title: 'Contact Us - Kliti Photography',
    description: 'Get in touch with Kliti Photography for quotes and inquiries.',
    type: 'website',
  }
}

export default function Contact() {
  return <ContactPage />
}
