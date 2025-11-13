import React from 'react'

// TODO: Fetch from Contentful CMS
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6">About Kliti Photography</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Kliti Photography, where we specialize in capturing
              life's most precious moments with artistry and professionalism.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              [Content to be managed via Contentful CMS]
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">What We Do</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Wedding Photography & Videography</li>
              <li>Birthday & Event Coverage</li>
              <li>Portrait Sessions</li>
              <li>Music Video Production</li>
              <li>Corporate & Commercial Photography</li>
              <li>Advertisement Campaigns</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              We believe in creating authentic, emotion-filled images that tell
              your unique story. Every project is approached with creativity,
              technical excellence, and a dedication to exceeding your
              expectations.
            </p>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>CMS Integration:</strong> This page content should be
                managed through Contentful. Create an "About Page" content model
                with rich text fields for flexible content management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
