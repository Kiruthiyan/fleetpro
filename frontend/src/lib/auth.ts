const TOKEN_KEY = "auth_token"
const ROLE_KEY = "auth_role"

export interface AuthResponse {
  token: string
  role: string
}

export const authService = {
  // Save authentication token and role
  setAuth: (response: AuthResponse) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, response.token)
      localStorage.setItem(ROLE_KEY, response.role)
    }
  },

  // Get authentication token
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  },

  // Get user role
  getRole: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ROLE_KEY)
    }
    return null
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authService.getToken() !== null
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    return authService.getRole() === "ADMIN"
  },

  // Clear authentication
  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(ROLE_KEY)
    }
  },

  // Get authorization header for API requests
  getAuthHeader: (): { Authorization: string } | {} => {
    const token = authService.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  },
}

