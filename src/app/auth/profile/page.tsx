'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { user, logout } = useAuth()
  const [isVerified, setIsVerified] = useState(user?.emailVerified || false)
  const [showModal, setShowModal] = useState(!isVerified)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])

  const refreshVerification = async () => {
    await user?.reload() // Reload user data from Firebase
    setIsVerified(user?.emailVerified || false)
    setShowModal(!user?.emailVerified)
  }

  return (
    <div className="container">
      <h1>Welcome, {user?.displayName || 'User'}</h1>
      <p>Email: {user?.email}</p>
      {isVerified ? (
        <p>Your email is verified! ✅</p>
      ) : (
        <div className="modal">
          <p>Your email is not verified. Please check your inbox.</p>
          <button onClick={refreshVerification}>
            I have verified my email
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  )
}
