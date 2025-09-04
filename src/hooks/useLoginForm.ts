// src/hooks/useLoginForm.ts
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { z } from 'zod'
import { useFormErrorHandler } from './useFormErrorHandler'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export type LoginFormData = z.infer<typeof loginSchema>

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { errors, validateForm } = useFormErrorHandler(loginSchema)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validateForm(formData)) return

    setLoading(true)
    const result = await login(formData.email, formData.password)

    if (result.success) {
      router.push('/auth/profile')
    } else {
      setServerError(result.error || 'Login failed')
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return {
    formData,
    errors,
    serverError,
    loading,
    handleSubmit,
    handleChange
  }
}
