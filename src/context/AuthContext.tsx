// src/context/AuthContext.tsx
'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { app } from '@/lib/firebase'

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  signup: (
    email: string,
    password: string,
    name: string,
    phone?: string
  ) => Promise<{
    uid?: string
    email?: string | null
    displayName?: string
    error?: string
    success: boolean
  }>
  signInWithGoogle: () => Promise<{ user?: User; error?: string }>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const token = await userCredential.user.getIdToken()

      // Set the session cookie without HttpOnly flag so client-side JS can access it
      document.cookie = `session=${token}; path=/; Secure`

      // Set a separate auth state cookie
      document.cookie = `auth-state=true; path=/; Secure`

      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  const logout = async () => {
    await signOut(auth)
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    phone?: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      try {
        await updateProfile(userCredential.user, {
          displayName: name
        })
      } catch (profileError) {
        console.error('Failed to set display name:', profileError)
      }

      try {
        await sendEmailVerification(userCredential.user)
      } catch (verificationError) {
        console.error('Failed to send email verification:', verificationError)
      }

      // Save user data to Firestore
      try {
        const db = getFirestore(app)
        await addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid,
          name: name,
          displayName: name,
          email: email,
          phone: phone || '',
          registrationDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isLinked: false,
          isPaid: false,
          emailVerified: false,
          isAdmin: false
        })
      } catch (firestoreError) {
        console.error('Failed to save user data:', firestoreError)
      }

      // Notify admin of new registration
      try {
        const db = getFirestore(app)
        const adminEmail =
          process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'silviberat@gmail.com'
        const linkMediaUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/link-media?userId=${userCredential.user.uid}`

        await addDoc(collection(db, 'sil-mail'), {
          to: adminEmail,
          message: {
            subject: `New User Registration: ${name}`,
            html: `
              <h2>New User Registered</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>User ID:</strong> ${userCredential.user.uid}</p>
              <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
              <br>
              <p><a href="${linkMediaUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Link Media for this User</a></p>
            `
          }
        })
      } catch (notificationError) {
        console.error('Failed to notify admin:', notificationError)
      }

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        success: true
      }
    } catch (error) {
      return {
        email: null,
        error: (error as Error).message,
        success: false
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()
      document.cookie = `session=${token}; path=/; Secure; HttpOnly`
      return { user: result.user }
    } catch (error) {
      return { error: (error as Error).message }
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, signup, signInWithGoogle }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
