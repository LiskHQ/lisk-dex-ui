import React from 'react';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { SwapConfirmModal, ISwapConfirmModalProps } from './index';
import { lightTheme } from 'styles/theme';
import { mockTokens } from '__mock__';

function renderComponent(props: ISwapConfirmModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <SwapConfirmModal {...props} />
    </ThemeProvider>
  );
}

describe('SwapConfirmModal', () => {
  const mockProps: ISwapConfirmModalProps = {
    toFiatRate: 1,
    toTokenRate: 1,
    fromAmount: 1,
    toToken: mockTokens[0],
    splipageTolerance: 0.1,
    openTransactionApproval: false,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it('click save button', () => {
    const { getByTestId } = renderComponent(mockProps);

    const button = getByTestId('swap-confirm-modal-button-test');
    fireEvent.click(button);

    expect(mockProps.onConfirm).toBeCalled();
  });

  it('click close button', () => {
    const { getByTestId } = renderComponent(mockProps);

    const button = getByTestId('swap-confirm-cancel-test');
    fireEvent.click(button);

    expect(mockProps.onClose).toBeCalled();
  });
});
