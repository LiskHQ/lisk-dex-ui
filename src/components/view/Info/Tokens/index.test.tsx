import React from 'react';
import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { lightTheme } from 'styles/theme';
import { mockTokenDetails } from '__mock__';
import { ITokenComponentProps, TokensComponent } from '.';

function renderComponent(props: ITokenComponentProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <TokensComponent {...props} />
    </ThemeProvider>
  );
}

describe('Info Tokens component', () => {
  const props: ITokenComponentProps = {
    tokenDetails: mockTokenDetails,
    tokenID: '',
    onSwap: jest.fn(),
    onAddLiquidity: jest.fn(),
    onSelectPool: jest.fn(),
    onSelectToken: jest.fn(),
  }

  it('checks if tokens component renders tokens correctly', () => {
    const { getAllByTestId } = renderComponent(props);
    expect(getAllByTestId('table-token-row')).toHaveLength(props.tokenDetails.length);
  });

  it('checks if tokens component renders a token correctly', () => {
    const { getAllByText } = renderComponent({
      ...props,
      tokenID: props.tokenDetails[2].tokenID,
    });
    expect(getAllByText(props.tokenDetails[2].name)[0]).toBeInTheDocument();
    expect(getAllByText(props.tokenDetails[2].symbol)[0]).toBeInTheDocument();
  });
});
