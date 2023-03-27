import { createTheme } from '@mui/material/styles'

const themeColors = {
  text: {
    primary: '#282828',
    secondary: '#818181',
    paragraph: '#6B7280',
    heading: '#4738A6',
  },
  primary: {
    10: '#0B0819',
    20: '#161133',
    30: '#22184C',
    40: '#2D2166',
    45: '#322573',
    50: '#38297F',
    60: '#433199',
    65: '#4935A6',
    70: '#4F39B2',
    75: '#543DBF',
  },
  success: {
    primary: '#459A33',
    second: '#8DC881',
  },
  warning: {
    primary: '#C9A81C',
    second: '#E2CA64',
  },
  info: {
    primary: '#71C9C1',
    second: '#C0ECE8',
  },
  error: {
    primary: '#FF4557',
    second: '#FB8B96',
  },
} as const

const darkTheme = createTheme({
  ...themeColors,
  palette: {
    mode: 'dark'
  }
})

export default darkTheme
