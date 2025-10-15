import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { Link as RouterLink } from 'react-router-dom'
import { Book } from '../types/book'

export function BookCard({ book }: { book: Book }) {
  return (
    <Card component={RouterLink} to={`/books/${book.id}`} sx={{ textDecoration: 'none' }}>
      {book.coverUrl && (
        <CardMedia component="img" height="200" image={book.coverUrl} alt={book.title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="subtitle1" noWrap>{book.title}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>{book.author}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Rating name="read-only" size="small" value={book.rating} precision={0.5} readOnly />
          <Typography variant="caption" ml={0.5}>{book.rating.toFixed(1)}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}


