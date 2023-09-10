import { useRouter } from 'next/router';
import { ApproveTransactionModal, ProposalView, TransactionStatusModal } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { TransactionCommands, TransactionModule, TransactionStatus, TransactionType } from 'consts';
import { apiGetAuth } from 'apis';
import { useJsonRpc } from 'contexts';
import { voteOnProposalParamsSchema } from 'utils';

export const ProposalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { votes, votesTotal, votesTotalPages, proposal } = useSelector((state: RootState) => state.proposal);
  const [votesPage, setVotesPage] = useState<number>(0);

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

  const onViewMore = () => {
    setVotesPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    dispatch(AppActions.proposal.getVotesByProposal(votesPage));
    if (router.query.id) {
      dispatch(AppActions.proposal.getCertainProposal({ proposalId: router.query.id }));
    }
  }, [votesPage, dispatch, router.query.id]);

  const onVote = async (value: string) => {
    if (account && (value === 'yes' || value === 'no')) {
      const { chainId, publicKey, address } = account;
      let data;

      try {
        const reponse = await apiGetAuth({
          address: address,
        });
        data = reponse.data;
      } catch (e) {
        console.log(e);
      }

      const decision = value === 'yes' ? 1 : 0;

      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommands.createPool,
        fee: BigInt(5000000000000000000),
        nonce: BigInt(data.nonce),
        senderPublicKey: Buffer.from(publicKey, 'hex'),
        signatures: [],
        params: {
          proposalIndex: 1,
          decision: decision,
        },
      };

      liskRpc.signTransaction(chainId, publicKey, voteOnProposalParamsSchema, rawTx);
      setOpenTransactionStatusModal(true);
      setCloseTransactionModal(false);
    }
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

  const onCloseTransactionStatusModal = () => {
    setOpenTransactionStatusModal(false);
    if (submitedTransaction || transactionError.error) {
      setCloseTransactionModal(true);
      setTransactionStatus(TransactionStatus.PENDING);
      dispatch(AppActions.transaction.resetTransactionStates());
    }
  };

  const onCloseApproveTransactionModal = () => {
    setOpenApproveTransactionModal(false);
  };

  //submit signed transaction
  const onConfirmApproval = () => {
    if (rpcResult?.result) {
      dispatch(AppActions.transaction.submitTransaction({
        transaction: rpcResult.result,
      }));
    }
  };

  return (
    <>
      <ProposalView
        votes={votes}
        votesPage={votesPage}
        votesTotal={votesTotal}
        votesTotalPages={votesTotalPages}
        proposal={proposal}
        onViewMore={onViewMore}
        onVote={onVote}
      />
      {
        openTransactionStatusModal &&
        <TransactionStatusModal
          status={transactionStatus}
          type={TransactionType.SUPPLY_LIQUIDITY}
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