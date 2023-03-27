import { createTheme } from '@mui/material/styles'

const themeColors = {
  text: {
    primary: '#9A9A9A',
    secondary: '#818181',
    paragraph: '#6B7280',
    heading: '#4738A6',
  },
  bg: {
    primary: '#F5F5F5',
    secondary: '#C2C2EF',
  },
  success: {
    primary: '#E3F2E0',
    second: '#8DC881',
  },
  warning: {
    primary: '#F8F3D8',
    second: '#E2CA64',
  },
  info: {
    primary: '#EBF7F6',
    second: '#C0ECE8',
  },
  error: {
    primary: '#F6E4E6',
    second: '#FB8B96',
  },
} as const

const lightTheme = createTheme({
  ...themeColors,
  palette: {
    mode: 'light'
  }
})

export default lightTheme
