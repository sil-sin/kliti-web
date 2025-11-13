'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getImagesInFolder } from '@/app/actions/cloudinary-actions'
import { sendEmailVerification } from 'firebase/auth'

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [megaFiles, setMegaFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  const fetchFiles = async () => {
    setLoading(true)
    setError(null)
    if (!user) return
    try {
      const res = await getImagesInFolder(user.uid)
      setMegaFiles(res)
    } catch (e: any) {
      setError(e.message || 'Failed to load files')
      setMegaFiles([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    // Only fetch files if email is verified
    if (user.emailVerified) {
      fetchFiles()
    }
  }, [user])

  const handleResendVerification = async () => {
    if (!user) return
    try {
      await sendEmailVerification(user)
      setEmailSent(true)
    } catch (e: any) {
      setError(e.message || 'Failed to send verification email')
    }
  }

  // Show email verification notice if not verified
  if (user && !user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            Email Verification Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please verify your email address to access your media gallery. Check
            your inbox for the verification link.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
          {emailSent ? (
            <p className="text-green-600 mb-4">
              Verification email sent! Check your inbox.
            </p>
          ) : (
            <button
              onClick={handleResendVerification}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
            >
              Resend Verification Email
            </button>
          )}
          <button
            onClick={() => router.push('/')}
            className="block w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Gallery</h1>
        <div className="text-sm text-gray-600">
          <p>Welcome, {user?.displayName || user?.email}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading your media...</p>
        </div>
      ) : megaFiles && megaFiles.length > 0 ? (
        <>
          <div className="mb-4 text-gray-600">
            <p>{megaFiles.length} photos available</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {megaFiles.map((file) => (
              <div
                key={file.public_id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Image
                  src={`/api/image/${file.public_id}`}
                  alt={file.name || file.public_id}
                  width={400}
                  height={400}
                  className="object-cover w-full h-64"
                  onError={(e) => {
                    console.error(`Failed to load image: ${file.public_id}`)
                    ;(e.target as HTMLImageElement).src = '/placeholder.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600 mb-2">No media available yet</p>
          <p className="text-sm text-gray-500">
            Your photographer will upload your photos soon. You'll be notified
            via email when they're ready.
          </p>
        </div>
      )}
    </div>
  )
}
