'use server'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '@/lib/firebase'

export const fetchCollections = async () => {
  const db = getFirestore(app)
  const testCol = collection(db, 'testing')
  const testSnap = await getDocs(testCol)
  return testSnap.docs.map((doc) => doc.data())
}
