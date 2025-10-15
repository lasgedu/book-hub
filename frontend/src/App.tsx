import { Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

export default function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container sx={{ flex: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div>Protected Admin Area (placeholder)</div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Box component="footer" py={3} textAlign="center" color="text.secondary">
        Book Hub © {new Date().getFullYear()}
      </Box>
    </Box>
  )
}


