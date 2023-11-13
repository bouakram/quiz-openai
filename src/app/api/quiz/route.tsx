import prisma from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { CreateQuizSchema } from "@/schemas/form/quiz"
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import axios from 'axios'

type QuestionsType = {
    question: string,
    answer: string,
    option1: string,
    option2: string,
    option3: string,
}

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return NextResponse.json({ error: "you must be logged in" }, { status: 401 })
        }
        const body = await req.json()
        const { amount, topic, type } = CreateQuizSchema.parse(body)
        const quiz = await prisma.quiz.create({
            data: {
                quizType: type,
                timeStarted: new Date(),
                userId: session?.user.id,
                topic,
            }
        })
        const { data } = await axios.post(`${process.env.BASE_URL as string}/api/questions`, {
            amount,
            topic,
            type
        })

        let myQuestions = data.questions.map((question: QuestionsType) => {
            const options = [question.answer, question.option1, question.option2, question.option3].sort(() => Math.random() - 0.5);
            return {
                question: question.question,
                answer: question.answer,
                options: JSON.stringify(options),
                quizId: quiz.id,
                questionType: "mcq",
            }
        })
        await prisma.question.createMany({
            data: myQuestions
        })
        return NextResponse.json(
            {
                quizId: quiz.id
            },
            {
                status: 200
            }
        )
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}