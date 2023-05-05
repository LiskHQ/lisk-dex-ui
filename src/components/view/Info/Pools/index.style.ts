import styled from '@emotion/styled';

export const PoolsComponentStyle = styled('div')(({ theme }: any) => {
  return {
    [theme.breakpoints.down('md')]: {
      marginTop: '6.5rem',
      padding: '0 1rem',
    },

    '.info-header': {
      display: 'flex',
      justifyContent: 'space-between',

      marginTop: '3rem',
      marginBottom: '2rem',

      h6: {
        fontSize: '1.5rem',
        marginBottom: '0.25rem',
      },

      '.info-path': {
        display: 'flex',
        alignItems: 'center',

        color: theme.lightcurve[0],

        svg: {
          marginLeft: '0.5rem',
          marginRight: '0.5rem',
        }
      },

      '.info-view-contract': {
        display: 'flex',
        alignItems: 'center',
        color: theme.lightcurve[0],

        '.MuiIconButton-root': {
          width: '1rem',
          height: '1rem',
          marginLeft: '0.5rem',
          marginRight: '1rem',

          svg: {
            width: '1rem',
            height: '1rem',
            color: theme.lightcurve[0],
          }
        }
      },
    },

    '.pool-header': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2rem',

      '.pool-summary': {
        display: 'flex',
        alignItems: 'center',

        '.pool-summary-image-1': {
          zIndex: 10,
        },

        '.pool-summary-image-2': {
          marginLeft: '-0.75rem',
          zIndex: 1,
        },

        '.pool-summary-detail': {
          marginLeft: '1rem',
        }
      },

      '.pool-actions': {
        display: 'flex',
        alignItems: 'center',

        '.like-button': {
          width: 'fit-content',
          minWidth: '3.5rem !important',
          border: 'none',
          background: theme.primary[2.5],

          svg: {
            width: '1.25rem',
            height: '1.25rem',
            color: theme.lightcurve[0],
          }
        },

        '.MuiButtonBase-root': {
          width: 'fit-content',
          minWidth: '5.625rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          marginLeft: '0.75rem',

          '&.MuiButton-outlined': {
            color: theme.lightcurve[0],
            borderColor: theme.lightcurve[0],
          }
        }
      }
    },

    '.table-title': {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '4rem',
      marginBottom: '1.5rem',

      '.view-all': {
        display: 'flex',
        alignItems: 'center',
        color: theme.lightcurve[0],

        svg: {
          width: '0.5rem',
          height: '0.5rem',
          marginLeft: '0.25rem',
        }
      }
    }
  };
});