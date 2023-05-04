import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { CreateProposalView, ICreateProposalViewProps } from './index';
import React from 'react';
import { lightTheme } from 'styles/theme';
import { ProposalSubmittedModal } from './ProposalSubmittedModal';

function renderComponent(props: ICreateProposalViewProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <CreateProposalView {...props} />
    </ThemeProvider>
  );
}

describe('CreateProposalView', () => {
  const mockProps: ICreateProposalViewProps = {
    openTransactionApproval: false,
    approvedTransaction: false,
    onSubmit: jest.fn(),
    onCloseProposalSubmitted: jest.fn(),
  };

  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it('select pool incentivization proposal', () => {
    const { getByTestId, getByText } = renderComponent(mockProps);
    const poolIncentivization = getByTestId('pool-incentivization-proposal-test');

    fireEvent.click(poolIncentivization);
    expect(getByText('Select a pool ID')).toBeInTheDocument();
  });

  it('open proposal submitted modal', () => {
    renderComponent({
      ...mockProps,
      approvedTransaction: true,
    });

    const proposalSubmittedModal = render(
      <ThemeProvider theme={lightTheme}>
        <ProposalSubmittedModal />
      </ThemeProvider>
    );
    expect(proposalSubmittedModal.container).toBeInTheDocument();
  });

  it('close proposal submitted modal', () => {
    const { getByTestId } = renderComponent({
      ...mockProps,
      approvedTransaction: true,
    });

    fireEvent.click(getByTestId('proposal-submitted-modal-close'));

    expect(mockProps.onCloseProposalSubmitted).toBeCalled();
  });

});

