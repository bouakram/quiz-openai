import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className='text-center'>
            <p>&copy; 2023 - Created by <a href={'https://boughaziakram.vercel.app/'} target='_blank' className='bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-500 dark:to-gray-400'>BOUGHAZI-Akram</a></p>
        </footer>
    )
}

export default Footer