'use client'
import React, { FormEvent } from 'react'
import Button from '@/components/ui/Button/Button'
import { handleSignup } from '@/actions/firebaseActions'

const Page = () => {
  return (
    <div>
      <h2>Page</h2>
      <div>
        <b>Register</b>
        <form
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            // Cast e.target as HTMLFormElement
            const form = e.target as HTMLFormElement

            // Get form values safely
            const formData = new FormData(form)
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            const fullName = formData.get('fullName') as string

            const results = await handleSignup(email, password, fullName)
            console.log('results', results)
          }}
        >
          <label htmlFor="fullName">Full name </label>
          <input
            type="text"
            placeholder="Firstname Lastname"
            name="fullName"
            required
          />
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            placeholder="eg: j.doe@example.com"
            name="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="*********"
            name="password"
            required
          />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
export default Page
