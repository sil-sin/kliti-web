'use server'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { app } from '../lib/firebase'

export const fetchCollections = async () => {
  const db = getFirestore(app)
  const testCol = collection(db, 'testing')
  const testSnap = await getDocs(testCol)
  const testList = testSnap.docs.map((doc) => doc.data())
  return testList
}
