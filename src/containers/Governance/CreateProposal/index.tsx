import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ApproveTransactionModal, CreateProposalView, TransactionStatusModal } from 'components';
import { AlertVariant, ProposalType, TransactionCommands, TransactionModule, TransactionStatus, TransactionType, alertMessages } from 'consts';
import { useJsonRpc } from 'contexts';
import { AppActions, RootState } from 'store';
import { IAccount, IProposal, ITransactionObject } from 'models';
import { createProposalParamsSchema, createTransactionObject } from 'utils';
import pool from 'pages/pool';

export const CreateProposalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { accountTokens, tokenBalances } = useSelector((root: RootState) => root.token);
  const { submitedTransaction, submitingTransaction, error: transactionError } = useSelector((state: RootState) => state.transaction);
  const { account } = useSelector((state: RootState) => state.wallet);
  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  // states for approvalTransactionModal
  const [transactionObject, setTransactionObject] = useState<ITransactionObject>();
  const [feeTokenID, setFeeTokenID] = useState<string>('');
  const [openApproveTransactionModal, setOpenApproveTransactionModal] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [closeTransactionModal, setCloseTransactionModal] = useState<boolean>(false);
  const { pools } = useSelector((root: RootState) => root.pool);

  const {
    rpcResult,
    liskRpc,
  } = useJsonRpc();

  useEffect(() => {
    if (account?.chainId) {
      dispatch(AppActions.token.getAccountTokens({}));
    }
    if (account && account.address) {
      dispatch(AppActions.token.getTokenBalances({
        address: account.address,
      }));
    }
  }, [account, dispatch]);

  useEffect(() => {
    dispatch(AppActions.pool.getPools({}));
    dispatch(AppActions.transaction.resetTransactionStates());
  }, [dispatch]);

  const onSubmit = (proposal: IProposal) => {
    if (pools.length === 0 && proposal.proposalType === ProposalType.PoolIncentivization) {
      enqueueSnackbar('Pool is required to create proposal', { variant: 'alert', type: AlertVariant.fail, subject: alertMessages.POOL_DOES_NOT_EXIST });
      return;
    }

    if (account) {
      const { chainId, publicKey } = account;

      const content = {
        text: Buffer.from(proposal.description, 'utf8'),
        poolID: '0000000000000000000001000000000000c8'.slice(0, 16),
        multiplier: proposal.multiplier,
        metadata: {
          title: Buffer.from(proposal.title, 'utf8'),
          author: Buffer.from(proposal.author, 'utf8'),
          summary: Buffer.from(proposal.summary, 'utf8'),
          discussionsTo: Buffer.from(proposal.link || 'http://lisk.com', 'utf8'),
        },
      };

      const params = {
        type: proposal.proposalType === ProposalType.PoolIncentivization ? 0 : 1,
        content,
      };

      createTransactionObject(TransactionModule.dexGovernance, TransactionCommands.createProposal, account, params)
        .then(({ feeTokenID: _feeTokenID, transactionObject: rawTx, }) => {
          setTransactionObject(rawTx);
          setFeeTokenID(_feeTokenID);

          liskRpc.signTransaction(chainId, publicKey, createProposalParamsSchema, rawTx);
          setOpenTransactionStatusModal(true);
          setCloseTransactionModal(false);
        })
        .catch(e => {
          enqueueSnackbar(String(e), { variant: 'alert', type: AlertVariant.fail });
        });
    } else {
      enqueueSnackbar('', { variant: 'alert', type: AlertVariant.fail, subject: alertMessages.CONNECT_YOUR_WALLET });
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
    if (rpcResult && rpcResult.valid && openTransactionStatusModal) {
      setOpenApproveTransactionModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        pools={pools}
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
          approvingTransaction={submitingTransaction}
          transaction={transactionObject}
          account={account as IAccount}
          feeTokenID={feeTokenID}
          accountTokens={accountTokens}
          tokenBalances={tokenBalances}
          onConfirm={onConfirmApproval}
          onClose={onCloseApproveTransactionModal}
        />
      }
    </>
  );
};