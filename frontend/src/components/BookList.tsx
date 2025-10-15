import Grid from '@mui/material/Grid'
import { Book } from '../types/book'
import { BookCard } from './BookCard'

type Props = { items: Book[] }

export function BookList({ items }: Props) {
  return (
    <Grid container spacing={2}>
      {items.map(b => (
        <Grid key={b.id} item xs={12} sm={6} md={3}>
          <BookCard book={b} />
        </Grid>
      ))}
    </Grid>
  )
}