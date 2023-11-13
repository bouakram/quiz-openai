import QuestionsList from '@/components/statistics/Questions'
import Trophy from '@/components/statistics/Trophy'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/nextAuth'
import { redirect } from 'next/navigation'
import React from 'react'

type StatisticsPageType = {
    params: {
        id: string
    }
}

const StatisticsPage = async ({ params: { id } }: StatisticsPageType) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect('/')
    }

    const quiz = await prisma.quiz.findUnique({
        where: {
            id,
            userId: session?.user.id
        },
        include: {
            questions: true
        }
    })

    if (!quiz) {
        redirect('/quiz')
    }
    let accuracey: number = 0
    let totalCorrect = quiz.questions.reduce((acc, question) => {
        if (question.isCorrect) {
            return acc + 1
        }
        return acc
    }, 0)
    accuracey = Math.round((totalCorrect / quiz.questions.length) * 100) / 100
    return (
        <div className='p-8 md:max-w-[40rem] mx-auto'>
            <div className='flex justify-start mb-4'>
                <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>Statistics</h2>
            </div>
            <div className='mx-auto max-w-[30rem]'>
                <div className='mt-4'>
                    <Trophy accuracy={accuracey} />
                </div>
            </div>
            <QuestionsList questions={quiz.questions} />
        </div>
    )
}

export default StatisticsPage