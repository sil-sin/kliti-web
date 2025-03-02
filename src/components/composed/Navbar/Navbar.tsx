'use client'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button/Button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import classNames from 'classnames'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const router = useRouter()
  const currentPage = usePathname()
  //eslint-disable-next-line //@ts-ignore
  const [mounted, setMounted] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { name: 'Portfolio', page: '/portfolio' },
    { name: 'About', page: '/about' },
    { name: 'Pricing', page: '/pricing' },
    { name: 'Contact', page: '/contact' }
  ]

  return (
    <div className="bg-secondary p-1 relative  border-b border-neutral-200 z-50">
      <nav className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href={'/'}
              onClick={() => toggleMenu()}
              className="text-2xl font-bold my-2 text-primary"
            >
              KG Photography
            </Link>

            <div
              tabIndex={0}
              onBlur={() => setIsMenuOpen(false)}
              className={classNames(
                'lg:flex lg:flex-row lg:space-y-0 justify-end ', // Desktop styles
                isMenuOpen
                  ? 'absolute  top-full left-0 w-full bg-secondary-light flex flex-col pt-2 pb-4 space-y-1 shadow-lg lg:static lg:bg-secondary lg:max-w-fit lg:shadow-none lg:flex-row lg:space-y-0 lg:pt-0 lg:pb-0 lg:space-x-4'
                  : 'hidden' // Mobile toggle
              )}
            >
              {navLinks.map(({ name, page }) => (
                <Link
                  onClick={() => toggleMenu()}
                  key={page}
                  href={page}
                  className={classNames(
                    'text-lg px-6 py-3 text-center',
                    currentPage === page
                      ? 'text-primary-dark underline '
                      : 'text-primary'
                  )}
                >
                  {name}
                </Link>
              ))}
              <Button
                onClick={() => {
                  toggleMenu()
                  router.push('/auth')
                }}
                type="button"
                variant="outline"
                size={'md'}
                className="self-center  lg:inline-block max-w-sm lg:max-w-fit w-full  transition-colors duration-200 mx-4"
              >
                Enter
              </Button>
              <Button
                onClick={() => {
                  toggleMenu()
                  router.push('/book')
                }}
                type="button"
                variant="primary"
                size={'md'}
                className="self-center  lg:inline-block  max-w-sm lg:max-w-fit w-full transition-colors duration-200  "
              >
                Book a Session
              </Button>
            </div>
            <Button
              aria-label="Menu"
              type="button"
              className="lg:hidden hover:text-neutral-950 text-primary-dark focus:outline-none"
              onClick={toggleMenu}
              variant="secondary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
