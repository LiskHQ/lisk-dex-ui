import styled from "@emotion/styled"

export const ProposalViewStyle = styled('div')(({ theme }: any) => {
  return {
    position: 'relative',
    marginTop: '4.25rem',
    padding: '3rem',

    '.create-proposal-path': {
      display: 'flex',
      alignItems: 'center',
      color: theme.lightcurve[0],
      svg: {
        width: '1rem',
        margin: '0 0.5rem',
      }
    },
  }
})
