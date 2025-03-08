import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { login, logout, checkAuth } from '@/services/authService'
import { LoginRequest } from '@/models/authModel'
import { cookieStore, tokenUtils } from '@/lib/auth'
import { Roles } from '@/enums/roles'
import { toast } from 'sonner'
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
        
        if (result?.success) {
            localStorage.setItem('authenticated', 'true')
            router.push('/dashboard')
            return true
        }
        else {
            toast.error(result?.error)
            return false
        }
    }

    const handleLogout = async () => {
        try {
            const result = await logout()
            if (result.success) {
                clearAuth()
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


