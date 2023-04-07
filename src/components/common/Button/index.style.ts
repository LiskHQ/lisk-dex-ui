import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const ButtonComponentStyle = styled(Button)(({ theme }: any) => {
  return {
    width: '100%',
    background: theme.lightcurve[0],
    color: theme.text.button,
    padding: '0.75rem',
    textTransform: 'capitalize',

    '&:hover': {
      background: theme.lightcurve[10],
    },

    '&.Mui-disabled': {
      color: theme.text.button,
      opacity: 0.7,
    }
  }
})
