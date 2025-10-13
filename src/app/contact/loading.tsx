export default function ContactLoading() {
  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Loading Header */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto"></div>
        </div>

        {/* Loading Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
          {/* WhatsApp Section Loading */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 max-w-sm mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded-full animate-pulse max-w-xs mx-auto"></div>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-gray-200"></div>

          {/* Form Loading */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse max-w-sm mx-auto"></div>

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>

            <div className="text-center">
              <div className="h-12 bg-gray-200 rounded-full animate-pulse max-w-xs mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
