'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { signupSchema, type SignupFormData } from '@/lib/validations/auth'
import Button from '@/components/ui/button'

export default function SignUpForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null)
    setLoading(true)

    const result = await signup(
      data.email,
      data.password,
      data.name,
      data.phone
    )

    if (result.success) {
      router.push('/auth/profile')
    } else {
      setServerError(result.error || 'Sign up failed')
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
    >
      <h1 className="text-3xl font-semibold text-center">Sign Up</h1>

      {serverError && (
        <div className="p-3 bg-red-100 text-red-700 rounded text-center">
          {serverError}
        </div>
      )}

      <div className="space-y-2">
        <label className="block font-medium">Full Name</label>
        <input
          aria-label="full-name"
          type="text"
          {...register('name')}
          className={`w-full p-3 border rounded-md  ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Email</label>
        <input
          aria-label="email-input"
          type="email"
          {...register('email')}
          className={`w-full p-3 border rounded-md  ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Phone Number</label>
        <input
          aria-label="phone-input"
          type="tel"
          {...register('phone')}
          placeholder="+1234567890"
          className={`w-full p-3 border rounded-md  ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
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

      <div className="space-y-2">
        <label className="block font-medium">Confirm Password</label>
        <input
          aria-label="confirm-password-input"
          type="password"
          {...register('confirmPassword')}
          className={`w-full p-3 border rounded-md  ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant={loading ? 'disabled' : 'primary'}
        fullWidth
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  )
}
