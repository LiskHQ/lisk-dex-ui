import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { ITransactionStatusModalProps, TransactionStatusModal } from './index';
import React from 'react';
import { lightTheme } from 'styles/theme';

function renderComponent(props: ITransactionStatusModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <TransactionStatusModal {...props} />
    </ThemeProvider>
  );
}

describe('TransactionStatusModal', () => {
  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });

  it('cancel button click', () => {
    const onClose = jest.fn();
    const { getByText } = renderComponent({
      success: true,
      onClose,
    });

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(onClose).toBeCalled();
  });
});

