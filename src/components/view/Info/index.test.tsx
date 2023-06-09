import React from 'react';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { InfoView } from './index';
import { lightTheme } from 'styles/theme';

function renderComponent() {
  return render(
    <ThemeProvider theme={lightTheme}>
      <InfoView />
    </ThemeProvider>
  );
}

describe('Info page', () => {
  it('checks if change tab works fine', () => {
    const { getByText, getByTestId } = renderComponent();

    fireEvent.click(getByTestId('overview-tab-test'));
    expect(getByText('View and track liquidity, volume and fees generated by the Lisk decentralized exchange.')).toBeInTheDocument();

    fireEvent.click(getByTestId('pools-tab-test'));
    expect(getByText('Start earning incentives by providing liquidity.')).toBeInTheDocument();

    fireEvent.click(getByTestId('tokens-tab-test'));
    expect(getByText('Browse tokens on “dex”.')).toBeInTheDocument();
  });
});
