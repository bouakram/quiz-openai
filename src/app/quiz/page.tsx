import CreateQuiz from '@/components/CreateQuiz'
import { getAuthSession } from '@/lib/nextAuth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export const metadata = {
    title: "QuizGenAI Create Quiz"
}

const QuizPage = async (props: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        redirect('/')
    }
    return <CreateQuiz />
}

export default QuizPage