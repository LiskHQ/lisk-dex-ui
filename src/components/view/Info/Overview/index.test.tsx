import React from 'react';
import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { lightTheme } from 'styles/theme';
import { mockTokenDetails } from '__mock__';
import { IOverviewComponentProps, OverviewComponent } from '.';

function renderComponent(props: IOverviewComponentProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <OverviewComponent {...props} />
    </ThemeProvider>
  );
}

describe('Overview component', () => {
  const props: IOverviewComponentProps = {
    tokenDetails: mockTokenDetails,
    onSwap: jest.fn,
    onAddLiquidity: jest.fn,
    onSelectPool: jest.fn,
    onSelectToken: jest.fn,
  }

  it('checks if overview component renders tokens correctly', () => {
    const { getAllByTestId } = renderComponent(props);
    expect(getAllByTestId('table-token-row')).toHaveLength(props.tokenDetails.length);
  });
});
