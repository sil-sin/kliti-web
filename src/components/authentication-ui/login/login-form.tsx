'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import Button from '@/components/ui/button'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    setLoading(true)

    const result = await login(data.email, data.password)

    if (result.success) {
      router.push('/auth/profile')
    } else {
      setServerError(result.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
    >
      <h1 className="text-3xl font-semibold text-center">Log In</h1>

      {serverError && (
        <div className="p-3 bg-red-100 text-red-700 rounded text-center">
          Login failed. Please check your email and password and try again.
        </div>
      )}

      <div className="space-y-2">
        <label className="block font-medium">Email</label>
        <input
          aria-label="email-input"
          type="email"
          {...register('email')}
          className={`w-full p-3 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Password</label>
        <input
          aria-label="password-input"
          type="password"
          {...register('password')}
          className={`w-full p-3 border rounded-md  ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant={loading ? 'disabled' : 'primary'}
        fullWidth
      >
        {loading ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  )
}
