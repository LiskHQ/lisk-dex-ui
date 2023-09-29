import React from 'react';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { InfoView, InfoViewProps } from './index';
import { lightTheme } from 'styles/theme';
import { mockPoolDetails } from '__mock__';

function renderComponent(props: InfoViewProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <InfoView {...props} />
    </ThemeProvider>
  );
}

describe('Info page', () => {
  const props: InfoViewProps = {
    poolDetails: mockPoolDetails,
    conversionRates: {},
    getToken2FiatConversion: jest.fn,
  };
  it('checks if change tab works fine', () => {
    const { getByText, getByTestId } = renderComponent(props);

    fireEvent.click(getByTestId('overview-tab-test'));
    expect(getByText('View and track liquidity, volume and fees generated by the Lisk decentralized exchange.')).toBeInTheDocument();

    fireEvent.click(getByTestId('pools-tab-test'));
    expect(getByText('Start earning incentives by providing liquidity.')).toBeInTheDocument();

    fireEvent.click(getByTestId('tokens-tab-test'));
    expect(getByText('Browse tokens on “dex”.')).toBeInTheDocument();
  });

  it('checks if info page renders pools correctly', () => {
    const { getAllByTestId } = renderComponent(props);
    expect(getAllByTestId('table-pool-test')).toHaveLength(props.poolDetails.length);
  });
});
