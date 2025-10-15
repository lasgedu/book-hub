import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { booksApi } from '../utils/booksApi'
import { Book, PaginatedBooks } from '../types/book'
import { Filters } from '../components/Filters'
import { BookCard } from '../components/BookCard'
import { PaginationBar } from '../components/PaginationBar'

export function HomePage() {
  const filtering = useSelector((s: RootState) => s.filtering)
  const [data, setData] = useState<PaginatedBooks | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    booksApi.list({
      query: filtering.query || undefined,
      genre: filtering.genre,
      author: filtering.author,
      publishedFrom: filtering.publishedFrom,
      publishedTo: filtering.publishedTo,
      sortBy: filtering.sortBy,
      sortOrder: filtering.sortOrder,
      page: filtering.page,
      pageSize: filtering.pageSize
    }).then(setData).catch((e) => setError(e?.response?.data?.message || e.message)).finally(() => setLoading(false))
  }, [filtering])

  return (
    <>
      <Typography variant="h4" gutterBottom>Discover Books</Typography>
      <Filters />
      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      {data && (
        <>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {data.items.map((b: Book) => (
              <Grid key={b.id} item xs={12} sm={6} md={3}>
                <BookCard book={b} />
              </Grid>
            ))}
          </Grid>
          <PaginationBar total={data.total} />
        </>
      )}
    </>
  )
}