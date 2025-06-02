'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { getMegaFiles } from '@/actions/mega'
import Image from 'next/image'

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [megaFiles, setMegaFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchFiles = async () => {
    setLoading(true)

    if (!user) return

    const userFiles = await getMegaFiles(user.uid)
    setMegaFiles(userFiles)
  }

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }
    fetchFiles()
    setLoading(false)
  }, [user, router])

  return (
    <div>
      <h1 className="">Profile</h1>
      {megaFiles.map((file) => (
        <Image
          key={file.fileId}
          src={`/api/image/${file.fileId}`}
          alt="Test Image"
          width={200}
          height={200}
        />
      ))}
    </div>
  )
}
