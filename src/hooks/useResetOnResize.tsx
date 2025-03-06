import { useEffect, useState } from 'react'

const useResetOnResize = (resetStates: () => void) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      if (
        (windowWidth >= 1024 && newWidth < 1024) ||
        (windowWidth < 1024 && newWidth >= 1024)
      ) {
        resetStates()
      }
      setWindowWidth(newWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowWidth, resetStates])
}

export default useResetOnResize
