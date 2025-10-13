'use client'

import { MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button/Button'

export default function WhatsAppSection() {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp business number
    const phoneNumber = '+1234567890' // Update this with actual number
    const message = encodeURIComponent('Hi! I would like to get a quote for photography services.')
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4 fancy-text">
        Contact us to get a quote.
      </h2>
      
      <div className="flex items-center justify-center mb-6">
        <span className="text-lg text-gray-700 mr-3">WhatsApp</span>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleWhatsAppClick}
          icon={<MessageCircle className="w-5 h-5" />}
          iconPosition="left"
          className="bg-green-600 hover:bg-green-700 text-white border-0"
        >
          Send a message
        </Button>
      </div>
    </div>
  )
}
