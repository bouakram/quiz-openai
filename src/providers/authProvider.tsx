import { SessionProvider } from "next-auth/react"

type AuthProviderType = {
    children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderType) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthProvider