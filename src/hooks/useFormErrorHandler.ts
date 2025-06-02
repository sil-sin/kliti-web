// src/hooks/useFormErrorHandler.ts
import { useState } from 'react'
import { z, ZodSchema } from 'zod'

export function useFormErrorHandler<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<Partial<T>>({})

  const validateForm = (formData: T) => {
    try {
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: any = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0]] = err.message
          }
        })
        setErrors(formattedErrors)
      }
      return false
    }
  }

  return {
    errors,
    validateForm
  }
}
