'use server'

import { z } from 'zod'

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  eventType: z.string().min(1, 'Event type is required'),
  eventDescription: z.string().optional(),
  eventLocation: z.string().optional(),
  eventDate: z.string().optional(),
  eventTime: z.string().optional(),
  message: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactFormSchema.parse(data)

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    // 4. Integrate with CRM

    // For now, we'll just log and simulate success
    console.log('Contact form submission:', validatedData)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    // You can integrate with email services like:
    // - Nodemailer
    // - SendGrid
    // - Resend
    // - AWS SES
    
    // Example email notification (pseudo-code):
    /*
    await sendEmail({
      to: 'your-business@email.com',
      subject: `New Contact Form Submission - ${validatedData.eventType}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
        <p><strong>Event Type:</strong> ${validatedData.eventType}</p>
        <p><strong>Event Date:</strong> ${validatedData.eventDate || 'Not specified'}</p>
        <p><strong>Event Time:</strong> ${validatedData.eventTime || 'Not specified'}</p>
        <p><strong>Event Location:</strong> ${validatedData.eventLocation || 'Not specified'}</p>
        <p><strong>Event Description:</strong> ${validatedData.eventDescription || 'None'}</p>
        <p><strong>Additional Message:</strong> ${validatedData.message || 'None'}</p>
      `
    })

    // Send confirmation email to user
    await sendEmail({
      to: validatedData.email,
      subject: 'Thank you for contacting Kliti Photography',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Hi ${validatedData.firstName},</p>
        <p>We received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Kliti Photography Team</p>
      `
    })
    */

    return { success: true, message: 'Form submitted successfully' }
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Validation error', 
        errors: error.errors 
      }
    }
    
    return { 
      success: false, 
      message: 'An error occurred while submitting the form' 
    }
  }
}

// Utility function to send emails (implement based on your email service)
/*
async function sendEmail({ to, subject, html }: {
  to: string
  subject: string
  html: string
}) {
  // Implement your email sending logic here
  // Example with Nodemailer:
  
  const transporter = nodemailer.createTransporter({
    // Your email configuration
  })
  
  await transporter.sendMail({
    from: '"Kliti Photography" <noreply@klitiphotography.com>',
    to,
    subject,
    html,
  })
}
*/
