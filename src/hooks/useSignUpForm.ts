import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { z } from 'zod'

const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export type SignUpFormData = z.infer<typeof signUpSchema>

export function useSignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signup } = useAuth()

  const validateForm = () => {
    try {
      signUpSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<SignUpFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof SignUpFormData] = err.message
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
    const result = await signup(
      formData.email,
      formData.password,
      formData.fullName
    )

    if (result.success) {
      router.push('/auth/profile')
    } else {
      setServerError(result.error || 'Sign up failed')
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
