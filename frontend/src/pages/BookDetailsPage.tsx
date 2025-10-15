import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Rating from '@mui/material/Rating'
import { booksApi } from '../utils/booksApi'
import { Book } from '../types/book'

export function BookDetailsPage() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    booksApi.get(Number(id)).then(setBook).catch((e) => setError(e?.response?.data?.message || e.message)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>
  if (!book) return null

  return (
    <Box display="flex" gap={3}>
      {book.coverUrl && (
        <Box component="img" src={book.coverUrl} alt={book.title} sx={{ width: 240, borderRadius: 1 }} />
      )}
      <Box>
        <Typography variant="h4">{book.title}</Typography>
        <Typography color="text.secondary" gutterBottom>{book.author} • {new Date(book.publishedDate).toLocaleDateString()}</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Rating name="read-only" value={book.rating} precision={0.5} readOnly />
          <Typography variant="body2" ml={1}>{book.rating.toFixed(1)}</Typography>
        </Box>
        <Typography variant="body1" whiteSpace="pre-line">{book.description}</Typography>
      </Box>
    </Box>
  )
}