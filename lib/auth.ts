import { jwtDecode, JwtPayload } from 'jwt-decode'
import { cookies } from 'next/headers'


export interface UserInfo extends JwtPayload {
    id: string
    email: string
    role: string
    username: string
}

export const cookieStore = {
  get: async (name: string) => (await cookies()).get(name)?.value,

  set: async (name: string, value: string, options = {}) => {
    (await cookies()).set(name, value, {
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      ...options
    })
  },

  delete: async (name: string) => (await cookies()).delete(name)
}

export const tokenUtils = {
    isValid: (token: string): boolean => {
        try {
            const decodedToken = jwtDecode<UserInfo>(token)
            return decodedToken.exp ? Math.floor(Date.now() / 1000) < decodedToken.exp : false
          } catch {
            return false
          }
    },

    getUserInfo: (token: string): UserInfo | null => {
        try {
          const decodedToken = jwtDecode<UserInfo>(token)
          return decodedToken
        } catch {
          return null
        }
      }
    
}
