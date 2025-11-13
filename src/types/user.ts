export interface UserData {
  uid: string
  name: string
  lastName?: string
  email: string
  phone?: string
  address?: string
  instagram?: string
  facebook?: string
  registrationDate: string
  isLinked: boolean // Linked to Mega folder
  isPaid: boolean
  paymentMethod?: 'cash' | 'paypal' | 'card' | null
  orderType?: 'digital' | 'printed' | 'cd' | 'combo' | null
  orderStatus?: 'pending' | 'ready' | 'sent' | null
  emailVerified: boolean
  isAdmin?: boolean
}

export interface EmailChangeRequest {
  requestId: string
  userId: string
  currentEmail: string
  newEmail: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  processedAt?: string
  processedBy?: string
}

export interface OrderData {
  orderId: string
  userId: string
  selectedMedia: string[] // public_ids from Cloudinary
  orderType: 'digital' | 'printed' | 'cd' | 'combo'
  paymentMethod: 'cash' | 'paypal' | 'card'
  isPaid: boolean
  status: 'pending' | 'processing' | 'ready' | 'sent' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface MediaLinkJob {
  jobId: string
  userId: string
  megaFolderPath: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalFiles?: number
  processedFiles?: number
  createdAt: string
  completedAt?: string
  error?: string
}
