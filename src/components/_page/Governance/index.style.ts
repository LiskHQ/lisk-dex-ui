import styled from "@emotion/styled"

export const GovernanceStyle = styled('main')(({ theme }: any) => {
  return {
    flex: 1,
    background: theme.bg.primary,
    marginTop: '4.25rem',
    padding: '3rem',

    [theme.breakpoints.down('md')]: {
      padding: '3rem 1rem 0rem 1rem',
    },

    '.governance-container': {
      padding: 0,

      '.governance-banner': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: theme.bg.banner,
        width: '100%',
        borderRadius: '1rem',
        padding: '3rem 2rem',

        [theme.breakpoints.down('md')]: {
          paddingBottom: '1.5rem',
        },

        '.governance-title': {
          display: 'flex',
          alignItems: 'center',
          color: theme.text.primary,
          marginBottom: '1rem',

          '.governance-bank-icon': {
            fill: theme.text.primary,
            marginLeft: '0.75rem',
          },

          [theme.breakpoints.down('md')]: {
            justifyContent: 'space-between',
          },
        },

        '.governanace-description': {
          color: theme.text.paragraph,
        },

        '.governance-vote-image': {
          marginRight: '9.5rem !important',

          [theme.breakpoints.down('md')]: {
            display: 'none'
          },
        }
      },

      '.governance-proposals': {
        marginTop: '3rem',

        '.governance-proposals-title': {
          color: theme.text.primary,
        },

        '.governance-proposals-description': {
          marginTop: '0.5rem',
          color: theme.text.paragraph,
        },

        '.governance-proposals-actions': {
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          '.governance-proposals-select': {
            width: '11.25rem',
            height: '2rem',
            color: theme.text.paragraph,
            div: {
              padding: 0,
              paddingLeft: '0.75rem',
            },
          },

          '.governance-proposals-create': {
            color: theme.lightcurve[0],
            cursor: 'pointer',
          }
        },

        '.governance-proposals-items': {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '4rem',

          '.governance-empty-img': {
            marginTop: '4rem',
          }
        }
      }
    }
  }
})
