import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip'
import { Link as RouterLink } from 'react-router-dom'
import { Book } from '../types/book'

export function BookCard({ book }: { book: Book }) {
  const defaultCover = `https://via.placeholder.com/200x300/1a73e8/ffffff?text=${encodeURIComponent(book.title.substring(0, 20))}`
  
  return (
    <Card 
      component={RouterLink} 
      to={`/books/${book.id}`} 
      sx={{ 
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardMedia 
        component="img" 
        height="200" 
        image={book.coverUrl || defaultCover} 
        alt={book.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="subtitle1" fontWeight="bold" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          by {book.author}
        </Typography>
        <Box mt={1}>
          <Chip label={book.genre} size="small" color="primary" variant="outlined" />
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Rating name="read-only" size="small" value={book.rating} precision={0.5} readOnly />
          <Typography variant="caption" ml={0.5} fontWeight="bold">
            {book.rating.toFixed(1)}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
          Published {new Date(book.publishedDate).getFullYear()}
        </Typography>
      </CardContent>
    </Card>
  )
}