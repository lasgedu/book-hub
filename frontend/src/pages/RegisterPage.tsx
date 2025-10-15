import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }
    
    try {
      await axios.post('/api/auth/register', { email, password })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">Create Account</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Account created! Redirecting to login...</Alert>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            fullWidth
          />
          <TextField 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            fullWidth
            helperText="Minimum 6 characters"
          />
          <TextField 
            label="Confirm Password" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login here
            </Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  )
}
