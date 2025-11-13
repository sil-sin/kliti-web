'use server'

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore'
import { app } from '@/lib/firebase'
import type { UserData } from '@/types/user'

export async function getUsersList(): Promise<UserData[]> {
  try {
    const db = getFirestore(app)
    const usersCollection = collection(db, 'users')
    const usersSnapshot = await getDocs(usersCollection)

    const users: UserData[] = usersSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        uid: doc.id,
        name: data.name || data.displayName || 'Unknown',
        email: data.email || '',
        phone: data.phone || '',
        registrationDate:
          data.registrationDate || data.createdAt || new Date().toISOString(),
        isLinked: data.isLinked || false,
        isPaid: data.isPaid || false,
        paymentMethod: data.paymentMethod || null,
        orderType: data.orderType || null,
        orderStatus: data.orderStatus || null,
        emailVerified: data.emailVerified || false,
        isAdmin: data.isAdmin || false
      }
    })

    return users
  } catch (error) {
    console.error('Error fetching users list:', error)
    throw new Error('Failed to fetch users')
  }
}

export async function getUserById(userId: string): Promise<UserData | null> {
  try {
    const db = getFirestore(app)
    const userDoc = doc(db, 'users', userId)
    const userSnapshot = await getDoc(userDoc)

    if (!userSnapshot.exists()) {
      return null
    }

    const data = userSnapshot.data()
    return {
      uid: userSnapshot.id,
      name: data.name || data.displayName || 'Unknown',
      email: data.email || '',
      phone: data.phone || '',
      registrationDate:
        data.registrationDate || data.createdAt || new Date().toISOString(),
      isLinked: data.isLinked || false,
      isPaid: data.isPaid || false,
      paymentMethod: data.paymentMethod || null,
      orderType: data.orderType || null,
      orderStatus: data.orderStatus || null,
      emailVerified: data.emailVerified || false,
      isAdmin: data.isAdmin || false
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    throw new Error('Failed to fetch user')
  }
}

export async function updateUserPaymentStatus(
  userId: string,
  isPaid: boolean
): Promise<void> {
  try {
    const db = getFirestore(app)
    const userDoc = doc(db, 'users', userId)

    await updateDoc(userDoc, {
      isPaid,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating payment status:', error)
    throw new Error('Failed to update payment status')
  }
}

export async function updateUserMediaLinkStatus(
  userId: string,
  isLinked: boolean
): Promise<void> {
  try {
    const db = getFirestore(app)
    const userDoc = doc(db, 'users', userId)

    await updateDoc(userDoc, {
      isLinked,
      linkedAt: isLinked ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating media link status:', error)
    throw new Error('Failed to update media link status')
  }
}

export async function updateUserOrderStatus(
  userId: string,
  orderStatus: 'pending' | 'ready' | 'sent'
): Promise<void> {
  try {
    const db = getFirestore(app)
    const userDoc = doc(db, 'users', userId)

    await updateDoc(userDoc, {
      orderStatus,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}
