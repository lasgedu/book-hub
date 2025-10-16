import { Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AdminPage } from './pages/AdminPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

export default function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Box component="footer" py={3} textAlign="center" color="text.secondary" sx={{ bgcolor: 'white', borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2">
          Your Ultimate Book Discovery Platform
        </Typography>
        <Typography variant="body2" sx={{ mt: 4 }}>
          © Book Hub / All rights reserved
        </Typography>
      </Box>
    </Box>
  )
}


