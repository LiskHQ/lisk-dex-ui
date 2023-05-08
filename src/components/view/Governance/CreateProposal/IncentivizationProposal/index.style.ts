import styled from '@emotion/styled'

export const IncentivizationProposalStyle = styled('div')(({ theme }: any) => {
  return {
    '.MuiGrid-item': {
      width: '100%',

      '.proposal-pool-id': {
        '.MuiSelect-select': {
          padding: '0.5rem 4rem 0.5rem 1rem !important',
        }
      }
    }
  }
})
