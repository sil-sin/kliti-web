'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button/Button'

export default function ContactError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Contact page error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-6" />

          <h1 className="text-3xl font-light text-[var(--foreground)] mb-4 fancy-text">
            Something went wrong!
          </h1>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We encountered an error while loading the contact page. Please try
            again or contact us directly.
          </p>

          <div className="space-y-4">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={reset}
              icon={<RefreshCw className="w-5 h-5" />}
              iconPosition="left"
            >
              Try again
            </Button>

            <p className="text-sm text-gray-500">
              If the problem persists, you can reach us at{' '}
              <a
                href="mailto:contact@klitiphotography.com"
                className="text-blue-600 hover:underline"
              >
                contact@klitiphotography.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
