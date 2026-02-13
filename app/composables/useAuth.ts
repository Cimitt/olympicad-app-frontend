interface LoginCredentials {
  username: string
  password: string
}

interface TokenResponse {
  access: string
  refresh: string
}

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: 'student' | 'teacher' | 'admin'
  grade?: number
  phone_number?: string
  profile_picture?: string
  created_at: string
}

interface StudentRegistration {
  username: string
  email: string
  password: string
  password2: string
  first_name: string
  last_name: string
  grade: number
  phone_number?: string
}

interface TeacherRegistration {
  username: string
  email: string
  password: string
  password2: string
  first_name: string
  last_name: string
  phone_number?: string
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://127.0.0.1:8000'

  const token = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

  const useAuthFetch = <T = any>(url: string, options: any = {}) => {
    return useFetch<T>(`${baseURL}${url}`, {
      ...options,
      headers: {
        ...options?.headers,
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  const login = async (credentials: LoginCredentials) => {
    const { data, error } = await useFetch<TokenResponse>(`${baseURL}/api/auth/token/`, {
      method: 'POST',
      body: credentials
    })

    if (data.value) {
      token.value = data.value.access
      refreshToken.value = data.value.refresh
    }

    return { data, error }
  }

  const logout = () => {
    token.value = null
    refreshToken.value = null
    navigateTo('/login')
  }

  const refreshAccessToken = async () => {
    if (!refreshToken.value) return null

    const { data, error } = await useFetch<{ access: string }>(`${baseURL}/api/auth/token/refresh/`, {
      method: 'POST',
      body: { refresh: refreshToken.value }
    })

    if (data.value) {
      token.value = data.value.access
      return data.value.access
    }

    if (error.value) {
      logout()
    }

    return null
  }

  const getCurrentUser = () => {
    return useAuthFetch<User>('/api/auth/me/')
  }

  const updateCurrentUser = (userData: Partial<User>) => {
    return useAuthFetch<User>('/api/auth/me/', {
      method: 'PATCH',
      body: userData
    })
  }

  const registerStudent = (data: StudentRegistration) => {
    return useAuthFetch('/api/auth/register/student/', {
      method: 'POST',
      body: data
    })
  }

  const registerTeacher = (data: TeacherRegistration) => {
    return useAuthFetch('/api/auth/register/teacher/', {
      method: 'POST',
      body: data
    })
  }

  const getUsers = (params?: { role?: string; grade?: number }) => {
    return useAuthFetch<User[]>('/api/auth/users/', {
      params
    })
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    updateCurrentUser,
    registerStudent,
    registerTeacher,
    getUsers,
    isAuthenticated,
    useAuthFetch
  }
}