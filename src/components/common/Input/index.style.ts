import styled from '@emotion/styled'
import { FormControl } from '@mui/material'

export const InputComponentStyle = styled(FormControl)(({ theme }: any) => {
  return {
    '.MuiFormLabel-root': {
      position: 'unset',
      color: `${theme.text.primary} !important`,
      fontSize: '0.875rem',
      lineHeight: '1.124rem',
      fontWeight: 400,
      transform: 'none',
      WebkitTransform: 'none',
      msTransform: 'none',
    },

    '.MuiInput-root': {
      padding: '0.75rem 1rem',
      borderRadius: '0.25rem',
      color: theme.text.primary,
      border: `0.5px solid ${theme.border.primary}`,
      background: 'unset',
      animationDuration: '0.5s !important',
      marginTop: '0.5rem',
      fontSize: '1rem',
      lineHeight: '1.625rem',

      input: {
        padding: 0,
      },

      '&:before': {
        content: 'none',
      },

      '&:after': {
        content: 'none',
      },

      '&:hover': {
        border: `1px solid ${theme.lightcurve[10]}`,
      },

      '&:focus-within': {
        border: `1px solid ${theme.lightcurve[0]}`,
      },
    },

    '.MuiFormHelperText-root': {
      color: theme.error.second,
      margin: '0.5rem 0 0 0',
    }
  }
})
