import { SwapView } from 'components';
import { TransactionCommand, TransactionModule, TransactionType } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { mockTokens } from '__mock__';
import { useJsonRpc } from 'contexts';
import { swapExactInCommandSchema } from 'utils';
import { useEffect } from 'react';

export const SwapContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { closeTransactionModal } = useSelector((state: RootState) => state.transaction);
  const { account } = useSelector((state: RootState) => state.wallet);
  
  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    ping,
    isRpcRequestPending,
    rpcResult,
    isTestnet,
    liskRpc,
    setIsTestnet,
  } = useJsonRpc();
  
  useEffect(() => {
    dispatch(AppActions.token.getAvailableTokens({}));
    // dispatch(AppActions.token.getPopularPairings({}));
  }, []);

  const onConfirmSwap = () => {
    // dispatch(AppActions.transaction.sendTransaction({
    //   type: TransactionType.SWAP,
    // }));
    if (account) {
      const { address, publicKey } = account.data.summary;
      const rawTx = {
        module: TransactionModule.dex,
        command: TransactionCommand.swapExactIn,
        fee: '100000000',
        nonce: '1',
        senderPublicKey: publicKey,
        signatures: [],
        params: {
          tokenIdIn: 0,
          amountTokenIn: BigInt(250),
          tokenIdOut: 1,
          minAmountTokenOut: BigInt(10),
          //          swapRoute: [poolID],
          swapRoute: [1],
          maxTimestampValid: 10,
        },
      };

      liskRpc.signTransaction(account.chainId, address, swapExactInCommandSchema, rawTx);
    }
  };

  const getToken2FiatConversion = (tokenSymbol: string, currency: string) => {
    dispatch(AppActions.token.getToken2FiatConversion({
      tokenSymbol,
      currency,
    }));
  }

  return (
    <SwapView
      account={account}
      tokens={mockTokens}
      closeTransactionModal={closeTransactionModal}
      onConfirmSwap={onConfirmSwap}
      getToken2FiatConversion={getToken2FiatConversion}
    />
  );
};