import styled from '@emotion/styled'
import { Select } from '@mui/material'

export const DropdownStyle = styled(Select)(({ theme }: any) => {
  return {
    '.dropdown-arrow': {
      display: 'inline-block',
      marginRight: '1rem',
      border: `0.75 solid ${theme.primary[10]}`,
      userSelect: 'none',
      flexShrink: 0,
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      position: 'absolute',
      right: '0.5rem',
      top: 'calc(50% - 0.5em)',
      pointerEvents: 'none',
    }
  }
})
