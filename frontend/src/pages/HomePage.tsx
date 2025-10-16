import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Discover Books
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore our book Collections
        </Typography>
      </Box>
      
      <Filters />
      
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress size={60} />
        </Box>
      )}
      
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      
      {data && !loading && (
        <>
          {data.items.length === 0 ? (
            <Alert severity="info" sx={{ mt: 3 }}>
              No books found matching your criteria. Try adjusting your filters.
            </Alert>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, mb: 2 }}>
                Showing {data.items.length} of {data.total} books (Page {data.page})
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {data.items.map((b: Book) => (
                  <Grid key={b.id} item xs={12} sm={6} md={4} lg={3}>
                    <BookCard book={b} />
                  </Grid>
                ))}
              </Grid>
              <PaginationBar total={data.total} />
            </>
          )}
        </>
      )}
    </>
  )
}