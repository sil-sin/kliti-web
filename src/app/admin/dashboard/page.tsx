'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import {
  getUsersList,
  updateUserPaymentStatus
} from '@/app/actions/admin-actions'
import type { UserData } from '@/types/user'

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    // Check if user is admin (will verify via custom claim in backend)
    checkAdminStatus()
  }, [user])

  const checkAdminStatus = async () => {
    if (!user) return

    try {
      const token = await user.getIdTokenResult()
      if (token.claims.admin === true) {
        setIsAdmin(true)
        loadUsers()
      } else {
        router.push('/auth/profile')
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      router.push('/auth/profile')
    }
  }

  const loadUsers = async () => {
    setLoading(true)
    try {
      const usersList = await getUsersList()
      setUsers(usersList)
    } catch (error) {
      console.error('Error loading users:', error)
    }
    setLoading(false)
  }

  const handleMarkAsPaid = async (userId: string) => {
    try {
      await updateUserPaymentStatus(userId, true)
      loadUsers() // Refresh list
    } catch (error) {
      console.error('Error updating payment status:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Redirecting...
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage registered users and their orders
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Registered
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Verified
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Media Linked
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Order Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No registered users yet
                  </td>
                </tr>
              ) : (
                users.map((userData) => (
                  <tr key={userData.uid} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{userData.name}</td>
                    <td className="px-4 py-3 text-sm">{userData.email}</td>
                    <td className="px-4 py-3 text-sm">
                      {userData.phone || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(userData.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {userData.emailVerified ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {userData.isLinked ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Linked
                        </span>
                      ) : (
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                          Link Media
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {userData.isPaid ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Paid
                        </span>
                      ) : userData.paymentMethod === 'cash' ? (
                        <button
                          onClick={() => handleMarkAsPaid(userData.uid)}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs hover:bg-yellow-200"
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {userData.orderStatus ? (
                        <span className="capitalize">
                          {userData.orderStatus}
                        </span>
                      ) : (
                        <span className="text-gray-400">No order</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() =>
                          router.push(`/admin/user/${userData.uid}`)
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Verified</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.emailVerified).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Media Linked</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.isLinked).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pending Payments</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.paymentMethod && !u.isPaid).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
