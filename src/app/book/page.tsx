import { LucideMessageCircle, LucideMail, LucidePhone } from 'lucide-react'
import Link from 'next/link'

const BookPage = () => {
  // TODO: Fetch from Contentful CMS
  const contactInfo = {
    phone: '+1234567890',
    whatsapp: '1234567890',
    email: 'info@klitiphotography.com'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book a Session</h1>
          <p className="text-lg text-gray-600">
            Ready to capture your special moments? Get in touch to book your
            photography session.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

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
                <p className="text-gray-600">Quick response via WhatsApp</p>
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
                <p className="text-gray-600">{contactInfo.phone}</p>
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
                <p className="text-gray-600">{contactInfo.email}</p>
              </div>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-3">What to expect:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Consultation to understand your vision</li>
              <li>• Customized photography packages</li>
              <li>• Professional editing and watermarked previews</li>
              <li>• Digital delivery of high-resolution originals</li>
              <li>• Optional prints and physical media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage
