import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/auth/AuthContext'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Book Hub
        </Typography>
        <Box display="flex" gap={1}>
          {user ? (
            <>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              <Button variant="outlined" size="small" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
            </>
          ) : (
            <Button component={RouterLink} to="/login" variant="contained" size="small">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}


