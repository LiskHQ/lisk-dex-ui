import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { ITransactionStatusModalProps, TransactionStatusModal } from './index';
import React from 'react';
import { lightTheme } from 'styles/theme';
import { TransactionType } from 'consts';

function renderComponent(props: ITransactionStatusModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <TransactionStatusModal {...props} />
    </ThemeProvider>
  );
}

describe('TransactionStatusModal', () => {
  const mockProps = {
    success: true,
    type: TransactionType.SWAP,
    onClose: jest.fn(),
  };
  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it('cancel button click', () => {
    const { getByText } = renderComponent(mockProps);

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toBeCalled();
  });
});

