'use client'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import classNames from 'classnames'
import { useAuth } from '@/context/AuthContext'
import useResetOnResize from '@/hooks/useResetOnResize'
import UserDropdown from '@/components/ui/user-dropdown'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShowUserDropdown, setShowUserDropdown] = useState(false)

  const router = useRouter()
  const currentPage = usePathname()
  const [mounted, setMounted] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
    setShowUserDropdown(false)
  }

  const resetStates = () => {
    setIsMenuOpen(false)
    setShowUserDropdown(false)
  }

  useResetOnResize(resetStates)
  const { user, loading } = useAuth()
  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { name: 'Portfolio', page: '/portfolio' },
    { name: 'About', page: '/about' },
    { name: 'Pricing', page: '/pricing' },
    { name: 'Contact', page: '/contact' }
  ]

  const handleLinkClick = () => {
    setIsMenuOpen(false)
    setShowUserDropdown(false)
  }

  return (
    <div className="bg-secondary p-1 relative border-b border-neutral-200 z-50">
      <nav className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href={'/'} className="text-2xl font-bold my-2 text-primary">
              KG Photography
            </Link>

            <div
              onMouseDown={(e) => e.preventDefault()}
              className={classNames(
                'lg:flex lg:flex-row lg:space-y-0 justify-end', // Desktop styles
                isMenuOpen
                  ? 'absolute top-full left-0 w-full bg-secondary-light flex flex-col pt-2 pb-4 space-y-1 shadow-lg'
                  : 'hidden' // Mobile toggle
              )}
            >
              {navLinks.map(({ name, page }) => (
                <Link
                  key={page}
                  href={page}
                  className={classNames(
                    'text-lg px-3 py-3 text-center',
                    currentPage === page
                      ? 'text-primary-dark underline '
                      : 'text-primary'
                  )}
                  onClick={handleLinkClick}
                >
                  {name}
                </Link>
              ))}
              <div className="self-center relative lg:inline-block max-w-sm lg:max-w-fit w-full transition-colors duration-200 ">
                <Button
                  onClick={() => {
                    user
                      ? setShowUserDropdown(!isShowUserDropdown)
                      : router.push('/auth')
                  }}
                  type="button"
                  variant="outline"
                  size="md"
                  className="w-full lg:w-auto lg:mx-2 lg:px-3"
                >
                  {user ? user.displayName : 'Enter'}
                </Button>
                {isShowUserDropdown && (
                  <div className="lg:absolute w-full mx-0 my-2 lg:w-48">
                    <UserDropdown onClick={handleLinkClick} />
                  </div>
                )}
              </div>

              <Button
                onClick={() => {
                  router.push('/book')
                  handleLinkClick()
                }}
                type="button"
                variant="primary"
                size="md"
                className="self-center lg:inline-block max-w-sm lg:max-w-fit w-full transition-colors duration-200"
              >
                Book a Session
              </Button>
            </div>
            <Button
              aria-label="Menu button"
              type="button"
              className="lg:hidden hover:text-neutral-950   text-primary-dark focus:outline-none"
              onClick={toggleMenu}
              variant="secondary"
            >
              {isMenuOpen ? (
                <X aria-label="close-menu" className="h-6 w-6" />
              ) : (
                <Menu aria-label="open-menu" className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
