import styled from '@emotion/styled';

export const HeaderStyle = styled('div')(({ theme }: any) => {
  return {
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 30,
    borderBottom: `1px solid ${theme.primary[20]}`,
    background: theme.bg.primary,

    '.header-logo': {
      fill: theme.primary[0],
    },

    '.header-container': {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '4.25rem',
      padding: '0 3rem',

      [theme.breakpoints.down('sm')]: {
        padding: '0 1rem',
      },

      '.header-menu': {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',

        '.header-menu-item': {
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          color: theme.text.body,
          fontWeight: 500,
          marginRight: '3rem',
          cursor: 'pointer',
          animationDuration: '0.5s',

          '&:hover': {
            opacity: '0.85',
          },

          '&.active': {
            borderBottom: `2.5px solid ${theme.lightcurve[0]}`,
            color: theme.lightcurve[0],
            h5: {
              fontWeight: '600',
            }
          },

          [theme.breakpoints.down('lg')]: {
            display: 'none'
          },
        },

        '.header-menu-chain': {
          '&>.MuiOutlinedInput-root': {
            width: '10rem',
            background: theme.primary[2.5],
            border: `0.5px solid ${theme.primary[5]}`,
            borderRadius: '0.75rem',
            marginLeft: '2rem',

            '&>.MuiSelect-select': {
              display: 'flex',
              padding: '0.75rem 0.75rem 0.75rem 0.5rem !important',
            },

            p: {
              color: theme.text.primary,
            },

            svg: {
              color: theme.text.primary,
              fill: theme.text.primary,
              marginRight: '0.25rem',
            },

            fieldset: {
              border: 'none',
            },

            [theme.breakpoints.down('lg')]: {
              display: 'none'
            },
          }
        },

        '.header-menu-wallet': {
          display: 'flex',
          alignItems: 'center',
          background: theme.primary[2.5],
          border: `0.5px solid ${theme.primary[5]}`,
          borderRadius: '0.75rem',
          padding: '0.125rem 0.125rem 0.125rem 0.5rem',
          marginLeft: '0.75rem',
          color: theme.text.primary,

          '.header-menu-wallet-address': {
            display: 'flex',
            alignItems: 'center',
            background: theme.bg.walletAddress,
            border: `0.5px solid ${theme.primary[20]}`,
            borderRadius: '0.75rem',
            padding: '0.5rem 0.625rem',
            marginLeft: '0.75rem',

            h5: {
              marginRight: '0.5rem',
            }
          }
        },

        '.header-menu-list-button': {
          marginLeft: '0.5rem',
          color: theme.text.primary,
        }
      }
    }
  };
});
