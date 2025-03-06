// src/hooks/useLoginForm.ts
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { z } from 'zod'

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
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const validateForm = () => {
    try {
      loginSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<LoginFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof LoginFormData] = err.message
          }
        })
        setErrors(formattedErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validateForm()) return

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
