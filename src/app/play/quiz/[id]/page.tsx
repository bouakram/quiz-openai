import Mcq from "@/components/quiz/Mcq"
import prisma from "@/lib/db"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

type PlayPageTypes = {
    params: {
        id: string
    }
}

const PlayPage = async ({ params: { id } }: PlayPageTypes) => {
    const session = await getAuthSession()
    if (!session?.user) {
        redirect('/')
    }
    const quiz = await prisma.quiz.findUnique({
        where: {
            id
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true
                }
            }
        }
    })
    if (!quiz) {
        return redirect('/quiz')
    }
    return (
        <Mcq data={quiz} />
    )
}
export default PlayPage