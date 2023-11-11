import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
import { getAuthSession } from '@/lib/nextAuth'
import UserAcountNav from './UserAcountNav'
import { ThemeToggle } from './ThemeToggle'

type NavbarrTypes = {}

const Navbar = async ({ }: NavbarrTypes) => {
  const session = await getAuthSession()
  return (
    <nav className='sticky inset-x-0 top-0 bg-gray-50/90 dark:bg-gray-900/90 h-fit py-2 border-b border-gray-100 dark:border-gray-900 shadow-sm z-10'>
      <div className='flex items-center justify-between h-full px-8'>
        <Link href={'/'} className='felx items-center rounded-lg border-4 border-gray-950 dark:border-gray-50 shadow-sm'>
          <p className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-950 to-gray-500 dark:from-gray-50 dark:to-gray-500'>QuizGen</p>
        </Link>

        <div className='flex items-center- gap-4'>
          <ThemeToggle />
          {
            session?.user && <UserAcountNav user={session?.user} />
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar