import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Stack alignItems="center" spacing={2}>
      <Typography variant="h4">Page Not Found</Typography>
      <Button component={RouterLink} to="/" variant="contained">Go Home</Button>
    </Stack>
  )
}