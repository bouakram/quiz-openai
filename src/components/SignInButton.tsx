"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = {
    text: string
}

const SignInButton = ({ text }: Props) => {
    return (
        <Button
            className='bg-gray-100 dark:bg-gray-900 border-2 border-b-4 border-r-4 border-gray-700 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg hover:scale-110 transition'
            onClick={() => signIn("google").catch(console.error)}
        >
            {text}
        </Button>
    )
}

export default SignInButton