import styled from '@emotion/styled'

export const ComfirmCreateProposalModalStyle = styled('div')(({ theme }: any) => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    '.confirm-proposal-background': {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 100,
    },

    '.confirm-proposal-modal-container': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginBottom: '10rem',
      transform: 'translate(-50%, -50%)',
      width: '42.375rem',
      borderRadius: '0.5rem',
      background: `${theme.bg.secondary} !important`,
      zIndex: 101,

      '.confirm-proposal-modal-header': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyConent: 'center',
        padding: '1.5rem',
        p: {
          textAlign: 'center',
          marginTop: '0.5rem',
          width: '16rem',
        },
        svg: {
          cursor: 'pointer',
          position: 'absolute',
          right: '1rem',
          top: '1rem',
        }
      },

      '.confirm-proposal-modal-body': {
        padding: '1.5rem',
        maxHeight: '43.75rem',
        overflowY: 'scroll',

        '.MuiFormControl-root': {
          width: '100%',
          marginBottom: '1.5rem',
        },

        '.confirm-proposal-type': {
          '.MuiFormLabel-root': {
            color: theme.text.primary,
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.124rem',
          },

          '.proposal-type-box': {
            display: 'flex',
            alignItems: 'center',
            background: theme.primary[1],
            borderRadius: '0.375rem',
            border: `1px solid ${theme.lightcurve[0]}`,
            padding: '1rem',

            svg: {
              width: '3rem',
              height: '3rem',
              padding: '0.5rem',
            },

            p: {
              color: theme.text.primary,
              marginLeft: '1rem',
            }
          }
        }
      },

      '.confirm-proposal-modal-footer': {
        padding: '1.5rem',
      },

      '.confirm-prpoposal-modal-transaction-fee': {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: `0.5px solid ${theme.border.primary}`,
        padding: '0.75rem 0',
        '.transaction-fee-title': {
          color: theme.text.body,
        }
      }
    }
  }
})
