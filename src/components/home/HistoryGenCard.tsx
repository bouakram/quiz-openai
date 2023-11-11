"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { History } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

const HistoryGenCard = (props: Props) => {
    const router = useRouter()
    return (
        <Card
            className='border border-r-4 border-b-4 border-gray-900 dark:border-gray-100 hover:-translate-y-1 transition cursor-pointer'
            onClick={() => { router.push('/history') }}
        >
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-xl font-bold text-gray-950 dark:text-gray-50'>Browser History</CardTitle>
                <History size={28} strokeWidth={2.5} />
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>View all the past Quizs.</p>
            </CardContent>
        </Card>
    )
}

export default HistoryGenCard