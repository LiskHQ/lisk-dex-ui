import styled from '@emotion/styled'
import { Input } from '@mui/material'

export const InputComponentStyle = styled(Input)(({ theme }: any) => {
  return {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
