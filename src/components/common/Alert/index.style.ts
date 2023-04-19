import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const AlertComponentStyle = styled(Box)(({ theme }: any) => {
  return {
    position: 'relative',
    padding: '1rem 0rem 1rem 1rem',
    background: theme.primary[2.5],
    width: '28rem',
    borderRadius: '0.25rem',

    [theme.breakpoints.down('sm')]: {
      width: 'unset',
    },

    '.alert-component-main': {
      display: 'flex',

      '.alert-component-icon': {
        width: '1.25rem',
      }
    },

    '.alert-component-content': {
      marginLeft: '1rem',
      paddingRight: '6rem',
      '.alert-component-subject': {
        marginBottom: '0.25rem',
      }
    },

    '.alert-component-cancel': {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      cursor: 'pointer',
    }
  }
})
