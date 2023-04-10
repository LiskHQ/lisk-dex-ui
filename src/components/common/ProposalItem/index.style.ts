import styled from '@emotion/styled'

export const ProposalItemStyle = styled('div')(({ theme }: any) => {
  return {
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    border: `1px solid ${theme.primary[10]}`,
    borderRadius: '0.75rem',
    background: theme.bg.proposalItem,
    cursor: 'pointer',

    '.proposal-item-main': {
      width: '100%',
      '.proposal-item-header': {
        width: '100%',
        marginBottom: '0.5rem',

        '.proposal-item-no': {
          display: 'flex',
          alignItems: 'center',

          '.proposal-item-type': {
            display: 'flex',
            alignItems: 'center',
            height: '1.25rem',
            borderRadius: '0.75rem',
            border: `0.75px solid ${theme.lightcurve[0]}`,
            padding: '0.25rem 0.625rem',
            marginLeft: '0.75rem',

            svg: {
              width: '0.75rem',
              height: '0.75rem',
            },

            h6: {
              marginLeft: '0.375rem',
              fontSize: '0.75rem',
            }
          },
        },

        '.proposal-item-status': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',

          p: {
            marginLeft: '0.25rem',

            '&:before': {
              position: 'absolute',
              left: '-0.625rem',
              top: '50%',
              transform: 'translateY(-50%)',
              content: '" "',
              width: '0.5rem',
              height: '0.5rem',
              background: theme.info.primary,
              borderRadius: '100%',
            }
          }
        }
      },

      '.proposal-item-period': {
        marginTop: '0.25rem',
        display: 'flex',

        svg: {
          marginRight: '0.25rem',
        },

        p: {
          color: theme.text.body,
          span: {
            color: theme.success.primary,
          }
        }
      }
    },

    '.proposal-item-arrow': {
      marginLeft: '4rem',
      marginRight: '0.75rem',
    }
  }
})
