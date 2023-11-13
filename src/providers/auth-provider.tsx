"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type AuthProviderType = {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export const AuthProvider = ({ children }: AuthProviderType) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}