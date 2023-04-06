import styled from "@emotion/styled"

export const CreateProposalViewStyle = styled('div')(({ theme }: any) => {
  return {
    marginTop: '4.25rem',
    padding: '3rem 17.1875rem',

    [theme.breakpoints.down('md')]: {
      padding: '3rem 1rem 0rem 1rem',
    },

    '.create-proposal-path': {
      display: 'flex',
      alignItems: 'center',
      color: theme.lightcurve[0],
      svg: {
        width: '1rem',
        margin: '0 0.5rem',
      }
    },

    '.create-proposal': {
      background: theme.bg.secondary,
      borderTop: `4px solid ${theme.lightcurve[0]}`,
      borderRadius: '0.25rem 0.25rem 0.5rem 0.5rem',
      boxShadow: theme.shadows.sm,
      marginTop: '1rem',

      '.create-proposal-header': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 7rem 2rem 7rem',

        '.create-proposal-title': {
          textAlign: 'center',
        },

        '.create-proposal-description': {
          color: theme.opacities[20],
          textAlign: 'center',
          marginTop: '0.75rem',
          width: '100%',
          span: {
            color: theme.lightcurve[0],
          }
        }
      }
    }
  }
})
