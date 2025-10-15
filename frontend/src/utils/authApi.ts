import axios from 'axios'

interface LoginResponse { token: string; user: { id: number; email: string } }

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await axios.post('/api/auth/login', { email, password })
    return data
  },
  async me(token: string): Promise<{ id: number; email: string }> {
    const { data } = await axios.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return data
  }
}


