"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { User } from 'next-auth'
import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserAcountNavType = {
    user: Pick<User, 'email' | 'name' | 'image'>
}

const UserAcountNav = ({ user }: UserAcountNavType) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                    {(user?.image && user?.name) ? <AvatarImage src={user?.image} alt={user?.name} /> : <AvatarFallback>{user?.name}</AvatarFallback>}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-100 dark:bg-gray-900" align='end'>
                <div className='flex items-center justify-center gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user?.name && <p className='font-medium'>{user?.name}</p>}
                        {user?.email && <p className='truncate text-sm text-gray-800 dark:text-gray-200'>{user?.email}</p>}
                    </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='text-red-500 cursor-pointer'
                    onClick={() => {
                        signOut().catch(console.error)
                    }}
                >
                    Logout
                    <LogOut className='w-4 h-4 ml-2' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAcountNav