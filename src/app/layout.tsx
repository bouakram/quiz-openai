import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/providers/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizGenAI: AI-Powered Quiz Generator',
  description: 'Create engaging quizzes effortlessly with QuizGenAI, an innovative app powered by OpenAI. Generate dynamic and interactive quizzes for your audience with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <AuthProvider >
          <Navbar />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
