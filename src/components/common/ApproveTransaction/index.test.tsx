import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { lightTheme } from 'styles/theme';
import { ApproveTransactionModal, IApproveTransactionModalProps } from '.';
import { mockAccount, mockTokenBalances, mockTokens, mockTransactionRaw } from '__mock__';

function renderComponent(props: IApproveTransactionModalProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <ApproveTransactionModal {...props} />
    </ThemeProvider>
  );
}

describe('Button component', () => {
  const mockProps: IApproveTransactionModalProps = {
    approvingTransaction: false,
    expenses: [],
    transaction: mockTransactionRaw,
    account: mockAccount,
    accountTokens: mockTokens,
    tokenBalances: mockTokenBalances,
    feeTokenID: mockTokenBalances[0].tokenID,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  it('checks all buttons click work fine', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText('Cancel'));
    expect(mockProps.onClose).toBeCalled();

    fireEvent.click(getByText('Approve'));
    expect(mockProps.onConfirm).toBeCalled();
  });

});