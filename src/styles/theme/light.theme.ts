import { createTheme } from '@mui/material/styles';
import { baseTheme } from './baseTheme';

const themeColors = {
  text: {
    primary: '#282828',
    secondary: '#515661',
    paragraph: '#6B7280',
    body: '#6B7280',
    heading: '#4738A6',
    button: '#FFFFFF',
    placeholder: '#6B7280',
  },
  lightcurve: {
    0: '#6953F4',
    10: '#A196F6',
    20: '#4738A6',
    40: '#362B7F',
    60: '#261E59',
    80: '#161133',
  },
  primary: {
    85: '#7E6CF4',
    60: '#A196F6',
    40: '#E4EBF9',
    20: '#D9D8F8',
    10: '#E7E9F9',
    5: '#EEF0F8',
    2.5: '#F2F5F9',
    1: '#F4F8F9',
    0: '#6953F4'
  },
  opacities: {
    5: '#333333',
    10: '#3D3D3D',
    20: '#535353',
    40: '#7E7E7E',
    80: '#D4D4D4',
  },
  border: {
    primary: '#E6E6E6',
  },
  bg: {
    primary: '#FBFBFB',
    secondary: '#FFFFFF',
    helper: '#22184D',
    banner: 'linear-gradient(180deg, #F3F3FD 0%, rgba(238, 238, 249, 0.9) 100%)',
    walletAddress: 'linear-gradient(180deg, #EEEFF7 0%, rgba(232, 234, 245, 0.8) 100%);',
    slider: '#F2F2F2',
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
} as const;

const lightTheme = createTheme({
  ...themeColors,
  ...baseTheme,
  palette: {
    mode: 'light'
  },
})

export default lightTheme
