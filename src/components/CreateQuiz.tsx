"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useForm } from 'react-hook-form'
import { CreateQuizSchema } from '@/schemas/form/quiz'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'

type Props = {}

type Input = z.infer<typeof CreateQuizSchema>

const CreateQuiz = (props: Props) => {
    const form = useForm<Input>({
        resolver: zodResolver(CreateQuizSchema),
        defaultValues: {
            amount: 3,
            topic: "",
            type: "mcq"
        }

    })
    const onSubmit = (input: Input) => {

        alert(JSON.stringify(input, null, 2));
    }
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Card>
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
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateQuiz