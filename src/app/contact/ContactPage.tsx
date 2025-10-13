'use client'

import { useState } from 'react'
import ContactForm from '@/components/contact/ContactForm'
import WhatsAppSection from '@/components/contact/WhatsAppSection'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[var(--foreground)] mb-4 fancy-text">
            Contact Page
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to capture your special moments? Get in touch with us to
            discuss your photography needs.
          </p>
        </div>

        {/* Contact Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
          {/* WhatsApp Section */}
          <WhatsAppSection />

          {/* Divider */}
          <div className="my-12 border-t border-gray-200"></div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
