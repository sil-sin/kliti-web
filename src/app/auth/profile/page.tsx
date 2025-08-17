'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { getImagesInFolder } from '@/actions/cloudinary-actions'

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [megaFiles, setMegaFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFiles = async () => {
    setLoading(true)
    setError(null)
    if (!user) return
    try {
      const res = await getImagesInFolder(user.uid)

      setMegaFiles(res) // Set to state
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
    fetchFiles()
  }, [user])

  console.log('Mega files:', megaFiles)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          Error: {error}
        </div>
      )}

      {loading ? (
        <p>Loading your files...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {megaFiles && megaFiles.length > 0 ? (
            megaFiles.map((file) => (
              <div key={file.public_id} className="relative">
                <Image
                  src={`/api/image/${file.public_id}`}
                  alt={file.public_id}
                  width={file.width || 200}
                  height={file.height || 200}
                  className="object-cover rounded-md"
                  onError={(e) => {
                    console.error(`Failed to load image: ${file.public_id}`)
                    ;(e.target as HTMLImageElement).src = '/placeholder.jpg'
                  }}
                />
                <p className="text-sm mt-1 truncate">Photo-{}</p>
              </div>
            ))
          ) : (
            <p>No files found</p>
          )}
        </div>
      )}
    </div>
  )
}
