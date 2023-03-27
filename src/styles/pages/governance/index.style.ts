import styled from '@emotion/styled'

export const GovernanceStyle = styled('main')(({ theme }: any) => {
  return {
    flex: 1,
    background: theme.bg.primary,
    position: 'relative',

    '.account-container': {
      position: 'relative',
      minHeight: '37rem',
      zIndex: 1,

      '.account-heading': {
        marginTop: '1.125rem',
        textAlign: 'center',
        fontSize: '2.875rem',
        fontWeight: 'bold'
      },

      '.account-board': {
        width: '100%',
        backgroundColor: theme.bg.board,
        marginTop: '2.5rem',
        marginBottom: '4rem',
        padding: '2rem 0 5rem',
        borderRadius: '2rem',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',

        '.MuiContainer-root': {
          '&:not(&.profile-container)': {
            [theme.breakpoints.up('lg')]: {
              maxWidth: '1270px'
            }
          },

          '.MuiTabPanel-root': {
            padding: 0
          }
        }
      }
    }
  }
})
