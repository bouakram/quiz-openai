import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Timer } from 'lucide-react'
import Link from 'next/link'

type Props = {
    limit: number,
    userId: string,
    title: string
}

const HistoryTrack = async ({ limit, userId, title }: Props) => {
    const quiz = await prisma.quiz.findMany({
        where: {
            userId: userId
        },
        take: limit,
        orderBy: {
            timeStarted: 'desc'
        }
    })
    const counter = await prisma.quiz.count({
        where: {
            userId: userId
        }
    })
    return (
        <Card className='border-b-4 border-r-4 max-h-[22rem] border-gray-700 dark:border-gray-300'>
            <CardHeader>
                <div className='flex flex-row items-center justify-between pb-4'>
                    <CardTitle className='text-xl font-bold text-gray-950 dark:text-gray-50'>{title}</CardTitle>
                    <Timer size={28} strokeWidth={2.5} />
                </div>
                <CardDescription className='text-muted-foreground'>you have played {counter} quiz.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col max-h-[14rem] justify-center items-center gap-8 overflow-y-scroll'>
                {
                    quiz && quiz.map((qui, index) => (
                        <Link href={`statistics/${qui.id}`} key={index} className='flex gap-4 border-b-2 cursor-pointer'>
                            <p className='font-bold'>{qui.topic}</p>
                            <span className='text-muted-foreground'>{qui.timeStarted.toISOString().substring(0, 10)}</span>
                        </Link>
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default HistoryTrack