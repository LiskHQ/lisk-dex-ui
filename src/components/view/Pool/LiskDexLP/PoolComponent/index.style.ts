import styled from "@emotion/styled";
import { Accordion } from "@mui/material";

export const PoolComponentStyle = styled(Accordion)(({ theme }: any) => {
  return {
    background: theme.primary[2.5],
    width: '100%',
    boxShadow: 'unset',

    '.MuiAccordionSummary-root': {
      '.MuiAccordionSummary-content': {
        display: 'flex',
        alignItems: 'center',

        '.pool-summary-token-name': {
          marginLeft: '0.5rem',
        },

        '.pool-summary-rate': {
          background: theme.primary[20],
          padding: '0.25rem 0.5rem',
          borderRadius: '0.5rem',
          marginLeft: '1rem',

          p: {
            fontSize: '0.75rem',
            lineHeight: '1rem',
          }
        }
      },
    },

    '.MuiAccordionDetails-root': {
      borderTop: `1px solid ${theme.primary[20]}`,
      padding: '1.5rem 1rem',

      '.pool-details': {
        display: 'flex',

        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',

          '.fees-earned': {
            marginTop: '2.5rem',
          }
        },

        '.pool-details-info': {
          width: '100%',

          '.pool-details-token': {
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '0.5rem',
            marginTop: '1rem',

            div: {
              display: 'flex',
              alignItems: 'center',
            },

            '.pool-details-image': {
              p: {
                marginLeft: '0.5rem',
              }
            },

            '.pool-details-amount': {
              '.MuiBox-root': {
                padding: '0.25rem 0.5rem',
                background: '#522FEB',
                borderRadius: '0.5rem',
                marginLeft: '0.5rem',

                p: {
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                }
              }
            },
          },

          '&.liquidity': {
            marginRight: '3rem',

            '.pool-details-token': {
              background: theme.lightcurve[20],
              padding: '0.5rem 0.75rem',

              p: {
                color: theme.text.button,
              },
            },
          },

          '&.fees-earned': {
            '.pool-details-token': {
              padding: '0.5rem 0',
            },

            '.pool-details-amount': {
              span: {
                marginLeft: '0.25rem',
              }
            }
          },
        },

        '.pool-detials-fees-earned': {
          width: '100%',
        }
      },

      '.pool-share': {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem',

        '.pool-share-title': {
          display: 'flex',
          alignItems: 'center',

          svg: {
            width: '1rem',
            height: '1rem',
            marginRight: '0.5rem',
          }
        }
      },

      '.pool-buttons': {
        display: 'flex',
        marginTop: '3rem',

        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',

          '.remove-liquidity': {
            marginBottom: '1rem',
          }
        },

        '.remove-liquidity': {
          marginRight: '1.5rem',
        }
      }
    }
  }
})