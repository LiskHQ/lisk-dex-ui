import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';
import { lightTheme } from 'styles/theme';
import { Provider } from 'react-redux';
import { store } from 'store';
import { PoolContainer } from '.';

function renderComponent() {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <PoolContainer />
      </ThemeProvider>
    </Provider>
  );
}

describe('Info container', () => {
  it('should render correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Supply Liquidity')).toBeInTheDocument();
    expect(getByText('Your LiskDEX LP')).toBeInTheDocument();
  });
});