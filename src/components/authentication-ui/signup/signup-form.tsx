'use client'
import { useEffect, useRef } from 'react'
import { useSignUpForm } from '@/hooks/useSignUpForm'
import Button from '@/components/ui/Button/Button'

export default function SignUpForm() {
  const { formData, errors, serverError, loading, handleSubmit, handleChange } =
    useSignUpForm()

  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailInputRef.current?.scrollIntoView({ behavior: 'smooth' })
    nameInputRef.current?.focus()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
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
          ref={nameInputRef}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md  ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Email</label>
        <input
          aria-label="email-input"
          ref={emailInputRef}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md  ${
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
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  )
}
