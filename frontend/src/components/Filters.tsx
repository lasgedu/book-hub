import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setAuthor, setGenre, setPublishedFrom, setPublishedTo, setQuery, setSort, setPage, resetFilters } from '../state/filtering/filteringSlice'

const genres = ['Fiction','Non-Fiction','Science','Fantasy','Romance','History','Biography']

export function Filters() {
  const dispatch = useDispatch()
  const filtering = useSelector((s: RootState) => s.filtering)
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField label="Search" fullWidth value={filtering.query} onChange={(e) => dispatch(setQuery(e.target.value))} />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField select label="Genre" fullWidth value={filtering.genre ?? ''} onChange={(e) => dispatch(setGenre(e.target.value || null))}>
            <MenuItem value="">All</MenuItem>
            {genres.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField label="Author" fullWidth value={filtering.author ?? ''} onChange={(e) => dispatch(setAuthor(e.target.value || null))} />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField type="date" label="From" fullWidth InputLabelProps={{ shrink: true }} value={filtering.publishedFrom ?? ''} onChange={(e) => dispatch(setPublishedFrom(e.target.value || null))} />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField type="date" label="To" fullWidth InputLabelProps={{ shrink: true }} value={filtering.publishedTo ?? ''} onChange={(e) => dispatch(setPublishedTo(e.target.value || null))} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <TextField select label="Sort By" fullWidth value={filtering.sortBy} onChange={(e) => dispatch(setSort({ sortBy: e.target.value as any, sortOrder: filtering.sortOrder }))}>
            <MenuItem value="createdAt">Recently Added</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="publishedDate">Published Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField select label="Order" fullWidth value={filtering.sortOrder} onChange={(e) => dispatch(setSort({ sortBy: filtering.sortBy, sortOrder: e.target.value as any }))}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end" alignItems="center">
          <Button variant="outlined" onClick={() => dispatch(resetFilters())}>Reset</Button>
        </Grid>
      </Grid>
    </Stack>
  )
}