// src/components/login/google-button.tsx
import Button from '@/components/ui/button'
import Image from 'next/image'

const GoogleButton = ({ onClick }: { onClick: () => Promise<void> }) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-0 shadow shadow-relief  focus:border  flex items-center justify-center gap-3 py-2 hover:bg-gray-50"
      onClick={onClick}
    >
      <Image
        src="/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="font-medium">Continue with Google</span>
    </Button>
  )
}

export default GoogleButton
