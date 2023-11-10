import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizGen: AI-Powered Quiz Generator',
  description: 'Create engaging quizzes effortlessly with QuizGen, an innovative app powered by OpenAI. Generate dynamic and interactive quizzes for your audience with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen pt-16')}>{children}</body>
    </html>
  )
}
