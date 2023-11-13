"use client"

import React, { useEffect, useState } from 'react'
import { Progress } from './ui/progress'
import Image from 'next/image'

type Props = {
    finished: boolean
}

const ProgressLoading = ({ finished }: Props) => {
    const [loading, setLoading] = useState<number>(1)
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(prev => {
                if (finished) return 100
                if (prev === 100) return 0
                if (Math.random() < 0.1) return prev + 2
                return prev + 0.5
            })
        }, 500)
        return () => clearInterval(interval)
    }, [finished])
    return (
        <main className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
            <Image
                src={'/loading.gif'}
                alt='loading image'
                className='mb-4'
                height={400}
                width={400}
            />
            <Progress value={loading} />
        </main>
    )
}

export default ProgressLoading