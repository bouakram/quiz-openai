"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-provider"

type AuthProviderType = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderType) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}