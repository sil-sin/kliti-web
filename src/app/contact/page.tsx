import React from 'react'
import {
  LucideMessageCircle,
  LucideMail,
  LucidePhone,
  LucideMapPin
} from 'lucide-react'
import Link from 'next/link'

// TODO: Fetch from Contentful CMS
const ContactPage: React.FC = () => {
  const contactInfo = {
    phone: '+1234567890',
    whatsapp: '1234567890',
    email: 'info@klitiphotography.com',
    address: 'Your Studio Address Here'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600">
            We'd love to hear about your project. Reach out through any of the
            channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

            <div className="space-y-6">
              {/* WhatsApp */}
              <Link
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
              >
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <LucideMessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-gray-600 text-sm">Quick messaging</p>
                </div>
              </Link>

              {/* Phone */}
              <Link
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <div className="bg-blue-500 text-white p-3 rounded-full">
                  <LucidePhone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.phone}</p>
                </div>
              </Link>

              {/* Email */}
              <Link
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
              >
                <div className="bg-purple-500 text-white p-3 rounded-full">
                  <LucideMail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.email}</p>
                </div>
              </Link>

              {/* Address */}
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-red-500 text-white p-3 rounded-full">
                  <LucideMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Studio Location</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition font-semibold"
              >
                Send Message
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
              Note: Form submission functionality to be implemented
            </p>
          </div>
        </div>

        {/* CMS Note */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>CMS Integration:</strong> Contact information should be
            managed through Contentful with a "Contact Info" content model
            including phone, email, WhatsApp, and address fields.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
