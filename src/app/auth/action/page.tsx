'use client'
import { FC, useEffect, useState } from 'react'
import { ActionCodeSettings, applyActionCode } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'

//Get your Firebase config from your environment variables (recommended for security).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  // ... other config values
}

//If you're not using environment variables, you can declare firebaseConfig here.

const VerifyEmail: FC = () => {
  const router = useRouter()
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const actionCode = queryParams.get('oobCode')
    const continueUrl = queryParams.get('continueUrl') || '/' //Default redirect
    const getToken = async () => {
      return user?.getIdToken()
    }
    if (actionCode) {
      const actionCodeSettings: ActionCodeSettings = {
        url: `${window.location.origin}/profile`, //Redirect to profile after success
        handleCodeInApp: true
      }

      applyActionCode(auth, actionCode)
        .then(() => {
          setVerified(true)
          const token = getToken()
          document.cookie = `session=${token}; path=/; Secure; HttpOnly`
        })
        .catch((error) => {
          setError(error.message)
        })
    } else {
      setError('Invalid verification link.')
    }
  }, [])

  if (verified) {
    return (
      <div>
        <h1>Email verified successfully!</h1>
        <p>You can now access your profile.</p>
        <button onClick={() => router.push('/profile')}>Go to Profile</button>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Verifying Email...</h1>
    </div>
  )
}

export default VerifyEmail
