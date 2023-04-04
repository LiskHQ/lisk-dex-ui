import styled from '@emotion/styled'
import { Radio } from '@mui/material'

export const RadioComponentStyle = styled(Radio)(({ theme }: any) => {
  return {
    color: `${theme.lightcurve[80]} !important`,

    '&.Mui-checked': {
      color: `${theme.lightcurve[0]} !important`,
    }
  }
})
