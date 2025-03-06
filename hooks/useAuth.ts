import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { login, logout, checkAuth } from '@/services/authService'
import { LoginRequest } from '@/models/authModel'
export const useAuth = () => {
    const router = useRouter()
    const { user, isLoading, isAuthenticated, clearAuth, setAuth } = useAuthStore()

    useEffect(() => {
        checkAuth().then(({ isAuthenticated, userInfo }) => {
            if (isAuthenticated && userInfo) {
                setAuth(true, userInfo)
                localStorage.setItem('authenticated', 'true')
            } else {
                clearAuth()
                const wasAuthenticated = localStorage.getItem('authenticated')
                if (wasAuthenticated) {
                    const hasShownExpiredMessage = localStorage.getItem('hasShownExpiredMessage')
                    if (!hasShownExpiredMessage) {
                        // localStorage.setItem('hasShownExpiredMessage', 'true')
                    }
                }
            }
        })

    }, [setAuth, clearAuth])

    const handleLogin = async (loginRequest: LoginRequest) => {
        const result = await login(loginRequest)
        if (result?.statusCode === 200) {
            localStorage.setItem('authenticated', 'true')
            // localStorage.removeItem('hasShownExpiredMessage')
            router.push('/dashboard')
            return true
        }
        return false
    }

    const handleLogout = async (userId: string) => {
        try {
            const result = await logout(userId)
            if (result.success) {
                clearAuth()
                // localStorage.removeItem('hasShownExpiredMessage')
                localStorage.removeItem('authenticated')
                router.push('/login')
                return true
            }
            return false
        } catch (error) {
            return false
        }
    }

    return {
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout
    }
}


