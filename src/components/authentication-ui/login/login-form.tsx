'use client'
import { useEffect, useRef } from 'react'
import { useLoginForm } from '@/hooks/useLoginForm'
import Button from '@/components/ui/Button/Button'

export default function LoginForm() {
  const { formData, errors, serverError, loading, handleSubmit, handleChange } =
    useLoginForm()
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailInputRef.current?.scrollIntoView({ behavior: 'smooth' })
    emailInputRef.current?.focus()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
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
          ref={emailInputRef}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Password</label>
        <input
          aria-label="password-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md  ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
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
