import { FC, ReactNode } from 'react'
import classNames from 'classnames'

type ButtonProps = {
  children: ReactNode | string
  onClick?: () => void
  type: 'submit' | 'button' | 'reset'
  variant: 'primary' | 'secondary' | 'outline' | 'text' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type,
  variant,
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left'
}) => {
  const btnClasses = classNames(
    'font-medium transition-all duration-300 rounded-full focus:outline-none inline-flex items-center justify-center',
    {
      // Base variants
      'bg-primary text-secondary-light border border-primary hover:bg-primary-dark active:bg-primary-dark':
        variant === 'primary',

      'bg-secondary text-primary border border-secondary hover:bg-secondary-dark active:bg-secondary-dark':
        variant === 'secondary',

      'bg-transparent text-primary border border-primary hover:bg-primary/5 active:bg-primary/10':
        variant === 'outline',

      'bg-transparent text-primary hover:bg-secondary active:bg-secondary-dark border-none':
        variant === 'text',

      'bg-neutral-300 text-neutral-500 border border-neutral-300 cursor-not-allowed':
        variant === 'disabled',

      // Sizes
      'text-sm px-4 py-1.5': size === 'sm',
      'text-base px-6 py-2.5': size === 'md',
      'text-lg px-8 py-3': size === 'lg',

      // Width
      'w-full': fullWidth
    },
    className
  )

  return (
    <button
      className={btnClasses}
      onClick={onClick}
      type={type}
      disabled={variant === 'disabled'}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  )
}

export default Button
