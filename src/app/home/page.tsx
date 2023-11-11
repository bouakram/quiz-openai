import HistoryGenCard from "@/components/home/HistoryGenCard"
import QuizGenCard from "@/components/home/QuizGenCard"
import { getAuthSession } from "@/lib/nextAuth"
import { redirect } from "next/navigation"

type Props = {}

export const metadata = {
    title: "QuizGen Home"
}

const HomePage = async (props: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        redirect('/')
    }
    return (
        <main className="p-8 mx-auto max-w-7xl">
            <div className="flex items-center">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Welcome Back <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-500 dark:to-gray-400">{session?.user.name}</span> 👋</h2>
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
                <QuizGenCard />
                <HistoryGenCard />
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7"></div>
        </main>
    )
}

export default HomePage