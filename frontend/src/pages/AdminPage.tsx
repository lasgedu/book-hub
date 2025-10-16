import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useAuth } from '../state/auth/AuthContext'

const genres = ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Romance', 'History', 'Biography']

export function AdminPage() {
  const { token } = useAuth()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('Fiction')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [publishedDate, setPublishedDate] = useState('')
  const [rating, setRating] = useState('4.0')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('author', author)
      formData.append('genre', genre)
      formData.append('description', description)
      formData.append('publishedDate', publishedDate)
      formData.append('rating', rating)
      if (coverImage) {
        formData.append('coverImage', coverImage)
      }
      
      await axios.post('/api/books', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setSuccess(true)
      // Reset form
      setTitle('')
      setAuthor('')
      setGenre('Fiction')
      setDescription('')
      setCoverImage(null)
      setPublishedDate('')
      setRating('4.0')
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Book</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Book added successfully!</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField 
              label="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              label="Author" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              select
              label="Genre" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)} 
              required 
              fullWidth
            >
              {genres.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              label="Published Date" 
              type="date"
              value={publishedDate} 
              onChange={(e) => setPublishedDate(e.target.value)} 
              required 
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ height: '56px' }}
            >
              {coverImage ? coverImage.name : 'Upload Cover Image'}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              label="Rating" 
              type="number"
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              required 
              fullWidth
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
              >
                {loading ? 'Adding Book...' : 'Add Book'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}