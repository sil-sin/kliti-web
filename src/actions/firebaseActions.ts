'use server'
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'
// In your component or relevant file
import { app, auth } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'

export const fetchCollections = async () => {
  const db = getFirestore(app)
  const testCol = collection(db, 'testing')
  const testSnap = await getDocs(testCol)
  return testSnap.docs.map((doc) => doc.data())
}

// Signup
export const handleSignup = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    console.log(email, password, name)

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    console.log('Signup successful:', user)

    return {
      uid: user.uid,
      email: user.email,
      displayName: name // Manually passing the name since Firebase does not set it automatically
    }
  } catch (error) {
    console.error('Signup failed:', error)

    return {
      error: (error as Error).message // Ensure the error is serializable
    }
  }
}

// Sign-in
export const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    console.log('Login successful:', user)
    // Redirect or update UI
  } catch (error) {
    console.error('Login failed:', error)
    // Handle error (display message to user)
  }
}

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    console.log('User signed in with Google:', user)
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.name
    const errorMessage = error.message
    // The email of the user's account used.

    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.log('Google Sign-In Error:', error)
  }
}
