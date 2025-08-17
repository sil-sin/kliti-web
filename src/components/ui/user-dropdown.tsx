import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'

const UserDropdown = ({ onClick }: { onClick: () => void }) => {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    onClick()
    router.push('/auth')
  }

  return (
    <div className="w-full  bg-white lg:border lg:border-gray-200 lg:rounded-md lg:shadow-lg z-50">
      <div className="py-2">
        <Button
          type="button"
          variant="text"
          className="w-full text-left px-4 py-2"
          onClick={() => {
            onClick()
            router.push('/auth/profile')
          }}
        >
          Profile
        </Button>
        <Button
          type="button"
          variant="text"
          className="w-full text-left px-4 py-2"
          onClick={() => {
            onClick()
            router.push('/auth/settings')
          }}
        >
          Settings
        </Button>
        <Button
          type="button"
          variant="text"
          className="w-full text-left px-4 py-2"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default UserDropdown
