'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginForm from '@/components/authentication-ui/login/login-form'
import SignUpForm from '@/components/authentication-ui/signup/signup-form'
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import GoogleButton from '@/components/authentication-ui/google/google-button'

const AuthPage = () => {
  const { user, loading, signInWithGoogle } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  if (loading) return null
  if (user) redirect('/auth/profile')

  return (
    <AnimatePresence mode="wait">
      <div className=" relative min-h-screen flex flex-col items-center p-4 max-w-md mx-auto">
        <h2 className="text-3xl text-center font-extrabold mb-8">
          Access your profile to see your pictures and videos
        </h2>

        <div className="relative w-full max-h-1 space-y-6">
          {/* @ts-ignore*/}

          <GoogleButton onClick={signInWithGoogle} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          <div className="">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <SignUpForm />
              </motion.div>
            )}

            <motion.div className="text-center mt-[20px]">
              <p className="inline-flex items-center text-md gap-0">
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}
                <Button
                  className="px-2 font-black  text-primary"
                  type="button"
                  variant="text"
                  size="lg"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register' : 'Login'}
                </Button>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default AuthPage
