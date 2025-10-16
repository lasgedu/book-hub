import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8'
    },
    secondary: {
      main: '#6d28d9'
    },
    background: {
      default: '#fff5f7',
      paper: '#ffffff'
    }
  },
  shape: { borderRadius: 10 }
})


