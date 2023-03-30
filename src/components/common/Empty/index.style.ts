import styled from '@emotion/styled'

export const EmptyStyle = styled('div')(({ theme }: any) => {
  return {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '.empty-subject': {
      marginTop: '2rem',
      color: theme.text.secondary,
    },

    '.empty-description': {
      marginTop: '0.5rem',
      color: theme.text.paragraph,
    }
  }
})
