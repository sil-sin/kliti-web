'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import {
  updateUserProfile,
  requestEmailChange,
  deleteUserAccount
} from '@/actions/user-settings-actions'
import {
  userSettingsSchema,
  emailChangeSchema,
  accountDeletionSchema,
  type UserSettingsFormData,
  type EmailChangeFormData,
  type AccountDeletionFormData
} from '@/lib/validations/user'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEmailChange, setShowEmailChange] = useState(false)

  const {
    register: registerSettings,
    handleSubmit: handleSettingsSubmit,
    formState: { errors: settingsErrors },
    reset: resetSettings
  } = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema)
  })

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    reset: resetEmail
  } = useForm<EmailChangeFormData>({
    resolver: zodResolver(emailChangeSchema)
  })

  const {
    register: registerDelete,
    handleSubmit: handleDeleteSubmit,
    formState: { errors: deleteErrors }
  } = useForm<AccountDeletionFormData>({
    resolver: zodResolver(accountDeletionSchema)
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    // Load user profile data
    loadUserProfile()
  }, [user])

  const loadUserProfile = async () => {
    if (!user) return

    // TODO: Fetch from Firestore user document
    resetSettings({
      name: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
      phone: '',
      address: '',
      instagram: '',
      facebook: ''
    })
  }

  const onSubmitSettings = async (data: UserSettingsFormData) => {
    setLoading(true)
    setMessage(null)

    try {
      await updateUserProfile(user!.uid, data)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile'
      })
    }

    setLoading(false)
  }

  const onSubmitEmailChange = async (data: EmailChangeFormData) => {
    if (!user) return

    setLoading(true)
    try {
      await requestEmailChange(user.uid, user.email!, data.newEmail)
      setMessage({
        type: 'success',
        text: 'Email change request sent to admin for approval'
      })
      setShowEmailChange(false)
      resetEmail()
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to request email change'
      })
    }
    setLoading(false)
  }

  const onSubmitDelete = async (data: AccountDeletionFormData) => {
    if (!user) return

    setLoading(true)
    try {
      await deleteUserAccount(user.uid)
      await logout()
      router.push('/')
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete account'
      })
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleSettingsSubmit(onSubmitSettings)}
            className="space-y-6"
          >
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowEmailChange(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                >
                  Request Change
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Email changes require admin approval for security
              </p>
            </div>

            {/* Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  First Name
                </label>
                <input
                  type="text"
                  {...registerSettings('name')}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                    settingsErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John"
                />
                {settingsErrors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {settingsErrors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  {...registerSettings('lastName')}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                    settingsErrors.lastName
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Doe"
                />
                {settingsErrors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    {settingsErrors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                {...registerSettings('phone')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                  settingsErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1234567890"
              />
              {settingsErrors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {settingsErrors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Address
              </label>
              <textarea
                {...registerSettings('address')}
                rows={3}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                  settingsErrors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main St, City, State, ZIP"
              />
              {settingsErrors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {settingsErrors.address.message}
                </p>
              )}
            </div>

            {/* Social Media */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="inline w-4 h-4 mr-2" />
                    Instagram Username
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      {...registerSettings('instagram')}
                      className={`flex-1 px-4 py-2 border rounded-r-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                        settingsErrors.instagram
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="username"
                    />
                  </div>
                  {settingsErrors.instagram && (
                    <p className="text-sm text-red-500 mt-1">
                      {settingsErrors.instagram.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Facebook className="inline w-4 h-4 mr-2" />
                    Facebook Profile URL
                  </label>
                  <input
                    type="url"
                    {...registerSettings('facebook')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                      settingsErrors.facebook
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="https://facebook.com/yourprofile"
                  />
                  {settingsErrors.facebook && (
                    <p className="text-sm text-red-500 mt-1">
                      {settingsErrors.facebook.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          {/* Danger Zone */}
          <div className="mt-12 pt-8 border-t border-red-200">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Danger Zone
            </h3>

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-2">
                  Are you absolutely sure?
                </h4>
                <p className="text-sm text-red-700 mb-4">
                  This action cannot be undone. This will permanently delete
                  your account, all your media galleries, and remove all
                  associated data.
                </p>
                <form
                  onSubmit={handleDeleteSubmit(onSubmitDelete)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-2">
                      Type <strong>DELETE</strong> to confirm:
                    </label>
                    <input
                      type="text"
                      {...registerDelete('confirmation')}
                      className={`w-full px-4 py-2 border rounded-md ${
                        deleteErrors.confirmation
                          ? 'border-red-500'
                          : 'border-red-300'
                      }`}
                      placeholder="DELETE"
                    />
                    {deleteErrors.confirmation && (
                      <p className="text-sm text-red-500 mt-1">
                        {deleteErrors.confirmation.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Email Change Modal */}
        {showEmailChange && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Request Email Change</h2>
              <p className="text-gray-600 mb-6">
                Enter your new email address. An admin will review and approve
                your request.
              </p>
              <form
                onSubmit={handleEmailSubmit(onSubmitEmailChange)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    {...registerEmail('newEmail')}
                    className={`w-full px-4 py-2 border rounded-md ${
                      emailErrors.newEmail
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="newemail@example.com"
                  />
                  {emailErrors.newEmail && (
                    <p className="text-sm text-red-500 mt-1">
                      {emailErrors.newEmail.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailChange(false)
                      resetEmail()
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
