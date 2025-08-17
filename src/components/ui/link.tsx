import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
  external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      children,
      className,
      variant = 'default',
      size = 'default',
      external = false,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50'

    // Variant styles - using your project's color scheme
    const variantStyles = {
      default:
        'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/50',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent',
      ghost:
        'hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent',
      link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary/50'
    }

    // Size styles
    const sizeStyles = {
      default: 'h-10 px-6 py-2',
      sm: 'h-8 px-3 py-1 text-sm',
      lg: 'h-12 px-8 py-3 text-lg'
    }

    // External link props
    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      : {}

    return (
      <NextLink
        href={href}
        className={classNames(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...externalProps}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

export default Link
