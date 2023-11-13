import { Question } from '@prisma/client'
import React from 'react'
import { cn } from '@/lib/utils'

type QuestionsType = {
    questions: Question[]
}

const QuestionsList = ({ questions }: QuestionsType) => {
    return (
        <div className='mt-8'>
            <div className='flex gap-2 justify-between mb-2'>
                <p className='w-[200px] font-bold'>question</p>
                <p className='w-[100px] font-bold'>ansewr</p>
                <p className='w-[100px] font-bold'>your answer</p>
            </div >
            {
                questions.map((qst, index) => (
                    <div key={index} className='flex gap-2 justify-between border-b-2 mb-4'>
                        <p className='w-[200px] '>{qst.question}</p>
                        <p className='w-[100px] '>{qst.answer}</p>
                        <p className={cn({ 'text-green-500': qst.isCorrect, 'text-red-500': !qst.isCorrect }, 'w-[100px]')}>{qst.userAnswer}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default QuestionsList