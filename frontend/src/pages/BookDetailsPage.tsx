import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { booksApi } from '../utils/booksApi'
import { Book } from '../types/book'

export function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    booksApi.get(Number(id)).then(setBook).catch((e) => setError(e?.response?.data?.message || e.message)).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    )
  }
  
  if (error) return <Alert severity="error">{error}</Alert>
  if (!book) return null

  const defaultCover = `https://via.placeholder.com/300x450/1a73e8/ffffff?text=${encodeURIComponent(book.title.substring(0, 20))}`

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back to Books
      </Button>
      
      <Paper sx={{ p: 4 }}>
        <Box display="flex" gap={4} flexDirection={{ xs: 'column', md: 'row' }}>
          <Box 
            component="img" 
            src={book.coverUrl || defaultCover} 
            alt={book.title} 
            sx={{ 
              width: { xs: '100%', md: 300 }, 
              maxWidth: 300,
              borderRadius: 2,
              boxShadow: 3
            }} 
          />
          <Box flex={1}>
            <Chip label={book.genre} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h3" gutterBottom fontWeight="bold">
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Published {new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
            <Box display="flex" alignItems="center" mb={3}>
              <Rating name="read-only" value={book.rating} precision={0.5} readOnly size="large" />
              <Typography variant="h6" ml={1} fontWeight="bold">
                {book.rating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                / 5.0
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Description
            </Typography>
            <Typography variant="body1" paragraph whiteSpace="pre-line" lineHeight={1.8}>
              {book.description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}