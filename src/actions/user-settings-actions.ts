'use server'

import {
  getFirestore,
  doc,
  updateDoc,
  addDoc,
  collection,
  deleteDoc
} from 'firebase/firestore'
import { app } from '@/lib/firebase'

interface UserProfileData {
  name: string
  lastName?: string
  phone: string
  address?: string
  instagram?: string
  facebook?: string
}

export async function updateUserProfile(userId: string, data: UserProfileData) {
  try {
    const db = getFirestore(app)
    const userDoc = doc(db, 'users', userId)

    await updateDoc(userDoc, {
      name: data.name,
      lastName: data.lastName || '',
      displayName: `${data.name} ${data.lastName || ''}`.trim(),
      phone: data.phone,
      address: data.address || '',
      instagram: data.instagram || '',
      facebook: data.facebook || '',
      updatedAt: new Date().toISOString()
    })

    return { success: true }
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw new Error('Failed to update profile')
  }
}

export async function requestEmailChange(
  userId: string,
  currentEmail: string,
  newEmail: string
) {
  try {
    const db = getFirestore(app)

    // Create email change request for admin
    await addDoc(collection(db, 'email-change-requests'), {
      userId,
      currentEmail,
      newEmail,
      status: 'pending',
      createdAt: new Date().toISOString()
    })

    // Send notification to admin
    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'silviberat@gmail.com'
    await addDoc(collection(db, 'sil-mail'), {
      to: adminEmail,
      message: {
        subject: `Email Change Request from ${currentEmail}`,
        html: `
          <h2>Email Change Request</h2>
          <p><strong>User ID:</strong> ${userId}</p>
          <p><strong>Current Email:</strong> ${currentEmail}</p>
          <p><strong>Requested New Email:</strong> ${newEmail}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <br>
          <p>Please review and approve/reject this request in the admin dashboard.</p>
        `
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error requesting email change:', error)
    throw new Error('Failed to request email change')
  }
}

export async function deleteUserAccount(userId: string) {
  try {
    const db = getFirestore(app)

    // Delete user document from Firestore
    const userDoc = doc(db, 'users', userId)
    await deleteDoc(userDoc)

    // Notify admin
    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'silviberat@gmail.com'
    await addDoc(collection(db, 'sil-mail'), {
      to: adminEmail,
      message: {
        subject: `User Account Deleted: ${userId}`,
        html: `
          <h2>User Account Deleted</h2>
          <p><strong>User ID:</strong> ${userId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>This user has deleted their account. Please remove associated media from storage.</p>
        `
      }
    })

    // TODO: Delete from Firebase Auth (requires admin SDK)
    // TODO: Delete associated media from Cloudinary
    // TODO: Delete associated data from Mega

    return { success: true }
  } catch (error) {
    console.error('Error deleting user account:', error)
    throw new Error('Failed to delete account')
  }
}
