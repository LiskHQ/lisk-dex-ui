import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApproveTransactionModal, CreateProposalView, TransactionStatusModal } from 'components';
import { ProposalType, TransactionCommands, TransactionModule, TransactionStatus, TransactionType } from 'consts';
import { useJsonRpc } from 'contexts';
import { AppActions, RootState } from 'store';
import { IProposal } from 'models';
import { createProposalParamsSchema } from 'utils';

export const CreateProposalContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { account } = useSelector((state: RootState) => state.wallet);
  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);

  const {
    rpcResult,
    liskRpc,
  } = useJsonRpc();

  const onSubmit = (proposal: IProposal) => {
    if (account) {
      const { chainId, publicKey } = account;

      const content = {
        text: Buffer.from(proposal.description, 'hex'),
        poolID: Buffer.from('0000000000000000000001000000000000c8', 'hex').slice(0, 16),
        multiplier: proposal.multiplier,
        metadata: {
          title: Buffer.from(proposal.title, 'hex'),
          author: Buffer.from(proposal.author, 'hex'),
          summary: Buffer.from(proposal.summary, 'hex'),
          discussionsTo: Buffer.from(proposal.link || 'http://lisk.com', 'hex'),
        },
      };

      const rawTx = {
        module: TransactionModule.dexGovernance,
        command: TransactionCommands.createProposal,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(10),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          type: proposal.proposalType === ProposalType.PoolIncentivization ? 0 : 1,
          content,
        },
      };

      liskRpc.signTransaction(chainId, publicKey, createProposalParamsSchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
  };

  const onCloseProposalSubmitted = () => {
    dispatch(AppActions.transaction.resetTransactionStates());
  };

  const onCloseTransactionStatusModal = () => {
    setOpenTransactionStatusModal(false);
    if (submitedTransaction || transactionError.error) {
      setCloseTransactionModal(true);
      dispatch(AppActions.transaction.resetTransactionStates());
    }
  };

  //submit signed transaction
  const onConfirmApproval = () => {
    if (rpcResult?.result) {
      dispatch(AppActions.transaction.submitTransaction({
        transaction: rpcResult.result,
      }));
    }
  };

  const onCloseApproveTransactionModal = () => {
    setOpenApproveTransactionModal(false);
  };

  useEffect(() => {
    if (rpcResult && rpcResult.valid) {
      setOpenApproveTransactionModal(true);
    }
  }, [rpcResult]);

  useEffect(() => {
    if (submitedTransaction) {
      setTransactionStatus(TransactionStatus.SUCCESS);
      setOpenTransactionStatusModal(true);
    }
    if (transactionError.error) {
      setTransactionStatus(TransactionStatus.FAILURE);
      setOpenTransactionStatusModal(true);
    }
    setOpenApproveTransactionModal(false);
  }, [submitedTransaction, transactionError]);

  return (
    <>
      <CreateProposalView
        onSubmit={onSubmit}
        onCloseProposalSubmitted={onCloseProposalSubmitted}
      />
      {
        openTransactionStatusModal &&
        <TransactionStatusModal
          status={transactionStatus}
          type={TransactionType.SWAP}
          onClose={onCloseTransactionStatusModal}
        />
      }
      {
        openApproveTransactionModal &&
        <ApproveTransactionModal
          expenses={[{
            title: 'Transaction fee',
            amount: '0.87',
          }]}
          approvingTransaction={submitingTransaction}
          onConfirm={onConfirmApproval}
          onClose={onCloseApproveTransactionModal}
        />
      }
    </>
  );
};