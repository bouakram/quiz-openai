import SignInButton from "@/components/SignInButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect('/home')
  }
  const userCount = (await prisma.user.findMany()).length
  return (
    <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-r-4 border-b-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <Card className="min-w-[360px] bg-gray-100 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold text-gray-950 dark:text-gray-50">QuizGen: AI-Powered Quiz Generator 🤖</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
          <p>Create engaging quizzes effortlessly with QuizGen, an innovative app powered by AI. Generate dynamic and interactive quizzes to test your knowledge with ease. Join <span className="font-semibold"> -{userCount}- </span>  other users Now !.</p>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <SignInButton text={"Sign In with Google"} />
        </CardFooter>
      </Card>
    </main>
  )
}
