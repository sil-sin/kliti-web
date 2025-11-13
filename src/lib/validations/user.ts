import { z } from 'zod'

// User settings/profile schema
export const userSettingsSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  lastName: z
    .string()
    .max(50, 'Last name must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  address: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  instagram: z
    .string()
    .max(50, 'Instagram handle must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  facebook: z
    .string()
    .max(100, 'Facebook URL must be less than 100 characters')
    .optional()
    .or(z.literal(''))
})

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>

// Email change request schema
export const emailChangeSchema = z.object({
  newEmail: z
    .string()
    .min(1, 'New email is required')
    .email('Invalid email address')
})

export type EmailChangeFormData = z.infer<typeof emailChangeSchema>

// Account deletion confirmation schema
export const accountDeletionSchema = z.object({
  confirmation: z
    .string()
    .min(1, 'Please type DELETE to confirm')
    .refine((val) => val === 'DELETE', {
      message: 'You must type DELETE to confirm account deletion'
    })
})

export type AccountDeletionFormData = {
  confirmation: string
}
