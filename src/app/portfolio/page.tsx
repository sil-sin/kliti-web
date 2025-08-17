import React from 'react'

const Portfolio: React.FC = () => {
  const portfolioItems = [
    // Example portfolio items
    {
      id: 1,
      title: 'Wedding Photography',
      description: 'Capturing the essence of love.',
      imageUrl: '/images/wedding.jpg'
    },
    {
      id: 2,
      title: 'Event Photography',
      description: 'Documenting your special events.',
      imageUrl: '/images/event.jpg'
    },
    {
      id: 3,
      title: 'Portrait Photography',
      description: 'Creating timeless portraits.',
      imageUrl: '/images/portrait.jpg'
    }
  ]

  return (
    <div>
      <h2>Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
