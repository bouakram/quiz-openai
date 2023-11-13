"use client"

import { Question, Quiz } from '@prisma/client'
import { BarChart2, ChevronRight, Timer } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button, buttonVariants } from '../ui/button'
import McqCounter from './McqCounter'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import { CheckAnswerSchema } from '@/schemas/form/quiz'
import { useToast } from '../ui/use-toast'
import Link from 'next/link'
import { cn, formatTimeDelta } from '@/lib/utils'
import Confetti from 'react-confetti'
import { differenceInSeconds } from 'date-fns'

type McqType = {
    data: Quiz & { questions: Pick<Question, 'id' | 'question' | 'options'>[] }
}

const Mcq = ({ data }: McqType) => {
    const { toast } = useToast()
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState<number>(0)
    const [correctAnswer, setCorrectAnswer] = useState<number>(0)
    const [wrongAnswer, setWrongAnswer] = useState<number>(0)
    const [hasEnd, setHasEnd] = useState<boolean>(false)
    const [now, setNow] = useState<Date>(new Date())
    const currentQuestion = useMemo(() => {
        return data.questions[questionIndex]
    }, [questionIndex, data.questions])
    const options = useMemo(() => {
        if (!currentQuestion) return []
        if (!currentQuestion.options) return []
        return JSON.parse(currentQuestion.options as string) as string[]
    }, [currentQuestion])

    const { mutate: checkAnser, isPending: checking } = useMutation({
        mutationFn: async () => {
            const payload: z.infer<typeof CheckAnswerSchema> = {
                questionId: currentQuestion.id,
                userInput: options[selectedChoice]
            }
            const response = await axios.post('/api/checkAnswer', payload)
            return response.data
        }
    })
    useEffect(() => {
        const interval = setInterval(() => {
            if (!hasEnd) {
                setNow(new Date())
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [hasEnd])
    const handleNext = useCallback(() => {
        checkAnser(undefined, {
            onSuccess: ({ isCorrect }) => {
                if (hasEnd) {
                    return
                }
                if (questionIndex === data.questions.length - 1) {
                    setHasEnd(true)
                    return
                }
                if (isCorrect) {
                    toast({
                        variant: "success",
                        title: "Correct",
                        description: "Correct answer 😁"
                    })
                    setCorrectAnswer(prev => prev + 1)
                } else {
                    toast({
                        variant: "destructive",
                        title: "Wrong",
                        description: "Wrong answer 😞"
                    })
                    setWrongAnswer(prev => prev + 1)
                }
                setQuestionIndex(prev => prev + 1)
                setSelectedChoice(0)
            }
        })
    }, [checkAnser, data.questions.length, hasEnd, questionIndex, toast])

    if (hasEnd) {
        return (
            <div className='absolute top-0 left-0 w-full h-screen z-10'>
                <Confetti
                    height={window.innerHeight}
                    width={window.innerWidth}
                    recycle={false}
                />
                <div className='flex flex-col items-center justify-center min-h-screen'>
                    <p className='text-gray-900 dark:text-gray-100'>You have completed in <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-500 dark:to-gray-400'>{formatTimeDelta(differenceInSeconds(now, data.timeStarted))}</span> min.</p>
                    <Link
                        href={`/statistics/${data.id}`}
                        className={cn(buttonVariants(), "mt-4 bg-gray-100 dark:bg-gray-900 border-2 border-b-4 border-r-4 border-gray-700 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg")}
                    >
                        see statistics <BarChart2 className='ml-2' />
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <main className='flex flex-col justify-center items-center my-2 md:w-[30rem] sm-[w-25rem] w-[20rem] mx-auto'>
            <div className='flex flex-row justify-between items-center w-full'>
                <div>
                    <p className=''>
                        <span className=''>Topic:</span>
                        <span className='text-lg text-gray-800 dark:text-gray-200 font-semibold'> {data.topic}</span>
                    </p>
                    <div className='flex self-start mt-2 text-gray-500'>
                        <Timer className='mr-2' />
                        <span>{formatTimeDelta(differenceInSeconds(now, data.timeStarted))}</span>
                    </div>
                </div>
                <McqCounter correct={correctAnswer} wrong={wrongAnswer} />
            </div>
            <Card className='w-full mt-4 border-b-4 border-r-4 border-gray-700 dark:border-gray-300'>
                <CardHeader className='flex flex-row items-center'>
                    <CardTitle className='text-center divide-y divide-gray-500 mr-2'>
                        <div>{questionIndex + 1}</div>
                        <div className='text-base text-gray-500'>{data.questions.length}</div>
                    </CardTitle>
                    <CardDescription className='flex-grow text-lg'>{currentQuestion?.question}</CardDescription>
                </CardHeader>
            </Card>
            <div className='w-full mt-4 flex flex-col items-center justify-center gap-4'>
                {
                    options?.map((opt, index) => (
                        <Button
                            key={index}
                            className={`
                            bg-gray-100 dark:bg-gray-900 justify-start p-8 w-full
                            ${selectedChoice === index ?
                                    'border-b-4 border-r-4 border-gray-700 dark:border-gray-300'
                                    : 'border'} 
                                hover:-translate-y-1 hover:bg-gray-100 dark:hover:bg-gray-900 transition`
                            }
                            onClick={() => { setSelectedChoice(index) }}
                        >
                            <div className='flex items-center justify-center'>
                                <div className='p-1 px-3 mr-4 text-gray-900 dark:text-gray-100'>
                                    {index + 1}
                                </div>
                                <div className='text-gray-900 dark:text-gray-100 text-start'>{opt}</div>
                            </div>
                        </Button>
                    ))
                }
            </div>
            <Button
                className='group bg-gray-100 dark:bg-gray-900 self-end mt-4 p-4 border-b-4 border-r-4 border-gray-700 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition text-gray-900 dark:text-gray-100 text-lg'
                disabled={checking || hasEnd}
                variant="outline"
                onClick={() => {
                    handleNext()
                }}
            >
                Next
                {
                    checking ?
                        <div className='ml-2 w-4 h-3 rounded-full border-l-2 animate-spin border-l-gray-900 dark:border-l-gray-100'></div>
                        :
                        <ChevronRight className='group-hover:translate-x-1 transition' />
                }
            </Button>
        </main>
    )
}

export default Mcq