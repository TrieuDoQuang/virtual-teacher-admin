import { create } from 'zustand'

import { UserInfo } from '@/lib/auth'

interface AuthState {
    user: UserInfo | null
    isLoading: boolean
    isAuthenticated: boolean
    clearAuth: () => void
    setAuth: (isAuthenticated: boolean, user: UserInfo | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    clearAuth: () => set({ user: null, isAuthenticated: false }),
    setAuth: (isAuthenticated: boolean, user: UserInfo | null) => set({ user, isAuthenticated }),
}))
