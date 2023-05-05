import styled from '@emotion/styled';

export const TokensComponentStyle = styled('div')(({ theme }: any) => {
  return {
    [theme.breakpoints.down('md')]: {
      marginTop: '6.5rem',
      padding: '0 1rem',
    },

    '.info-header': {
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