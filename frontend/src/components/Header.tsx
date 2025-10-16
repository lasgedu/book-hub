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
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'primary.main', borderBottom: 1, borderColor: 'divider' }} elevation={0}>
      <Toolbar>
        <Typography variant="h4" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
          Book Hub
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          {user ? (
            <>
              <Button component={RouterLink} to="/admin" variant="outlined" size="small">
                Add Book
              </Button>
              <Button variant="contained" size="small" onClick={() => { logout(); navigate('/'); }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/register" variant="outlined" size="small">
                Register
              </Button>
              <Button component={RouterLink} to="/login" variant="contained" size="small">
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}


