"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useForm } from 'react-hook-form'
import { CreateQuizSchema } from '@/schemas/form/quiz'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ProgressLoading from './Progress'

type Props = {}

type Input = z.infer<typeof CreateQuizSchema>

const CreateQuiz = (props: Props) => {
    const router = useRouter()
    const [loader, serLoader] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean>(false)
    const { mutate: getQuestions, isPending } = useMutation({
        mutationFn: async ({ amount, topic, type }: Input) => {
            const response = await axios.post("/api/quiz", {
                amount,
                topic,
                type
            })
            console.log(response)
            return response.data
        }
    })
    const form = useForm<Input>({
        resolver: zodResolver(CreateQuizSchema),
        defaultValues: {
            amount: 3,
            topic: "",
            type: "mcq"
        }

    })
    const onSubmit = (input: Input) => {
        serLoader(true)
        getQuestions(input, {
            onSuccess: ({ quizId }) => {
                setFinished(true)
                setTimeout(() => {
                    router.push('/play/quiz/' + quizId)
                }, 1000)
            },
            onError: () => {
                serLoader(false)
            }
        }
        )
    }
    if (loader) {
        return <ProgressLoading finished={finished} />
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='min-w-[350px]'>
                <CardHeader>
                    <CardTitle className='font-bold text-2xl'>Create a new Quiz</CardTitle>
                    <CardDescription className='text-sm text-muted-foreground'>Please choose a topic to create a multi choice question.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Topic</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a topic..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Select a topic to create the quiz.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Questions</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter The amount..."
                                                type='number'
                                                min={1}
                                                max={10}
                                                {...field}
                                                onChange={(e) => form.setValue("amount", parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Select the number of questions you need.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isPending} type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateQuiz