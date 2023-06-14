import { Box, MenuItem, Typography } from '@mui/material';
import { ButtonComponent, DropdownComponent } from 'components';
import { LiskIcon } from 'imgs/icons';
import { ellipsisAddress } from 'utils';
import { WalletComponentStyle } from './index.style';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ConnectWalletModal } from './ConnectWalletModal';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { WalletModal } from './WalletModal';
import { useChainData, useJsonRpc, useWalletConnectClient } from 'contexts';
import { DEFAULT_LISK_METHODS, DEFAULT_MAIN_CHAINS, DEFAULT_TEST_CHAINS } from 'consts';
import { AccountAction } from 'models';
import { useDispatch } from 'react-redux';
import { AppActions } from 'store';

export interface IWalletComponentProps {
  onConnected: (connected: boolean) => void,
}

export const WalletComponent: React.FC<IWalletComponentProps> = (props) => {
  const { onConnected } = props;

  const dispatch = useDispatch();
  const [openConnectWalletModal, setOpenConnectWalletModal] = useState<boolean>(false);
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [connectClicked, setConnectClicked] = useState<boolean>(false);

  const [uri, setUri] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');

  // Initialize the WalletConnect client.
  const {
    client,
    // pairings,
    // session,
    connect,
    disconnect,
    chains,
    accounts,
    balances,
    // isFetchingBalances,
    // isInitializing,
    setChains,
  } = useWalletConnectClient();

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    // ping,
    liskRpc,
    // isRpcRequestPending,
    // rpcResult,
    isTestnet,
    // setIsTestnet,
  } = useJsonRpc();

  const { chainData } = useChainData();

  const getLiskActions = (): AccountAction[] => {
    const onSignTransaction = async (chainId: string, address: string) => {
      //      openRequestModal();
      await liskRpc.testSignTransaction(chainId, address);
    };
    const onSignMessage = async (chainId: string, address: string) => {
      //      openRequestModal();
      await liskRpc.testSignMessage(chainId, address);
    };
    return [
      { method: DEFAULT_LISK_METHODS.LSK_SIGN_TRANSACTION, callback: onSignTransaction },
      { method: DEFAULT_LISK_METHODS.LSK_SIGN_MESSAGE, callback: onSignMessage },
    ];
  };

  const getBlockchainActions = (chainId: string) => {
    const [namespace] = chainId.split(':');
    switch (namespace) {
      case 'lisk':
        return getLiskActions();
      default:
        break;
    }
  };

  const onConnect = (chainId: string) => {
    setChains([chainId]);
    setConnectClicked(true);
  };

  useEffect(() => {
    if (chains.length && connectClicked) {
      setConnectClicked(false);
      if (typeof client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      connect(undefined, (uri: string) => {
        setUri(uri);
      });
    }
  }, [chains, connectClicked, client, connect]);

  const onCloseConnectWalletModal = () => {
    setOpenConnectWalletModal(false);
    setUri('');
  };

  const onDisconnect = () => {
    disconnect()
      .then(() => {
        setOpenWalletModal(false);
      });
  };

  useEffect(() => {
    if (accounts.length > 0) {
      const [namespace, reference, address] = accounts[0].split(':');
      const chainId = `${namespace}:${reference}`;
      setAddress(address);
      setChainId(chainId);

      dispatch(AppActions.wallet.setAddress(address));

      onConnected(true);
    } else {
      setUri('');
      setAddress('');
      setChainId('');
      onConnected(false);
    }
  }, [accounts, dispatch, onConnected]);

  return (
    <WalletComponentStyle>
      {
        accounts.length > 0 ?
          <>
            <DropdownComponent
              className="header-menu-chain"
              defaultValue={10}
            >
              <MenuItem value={10}><LiskIcon /><Typography variant="h5">Lisk-testnet</Typography></MenuItem>
            </DropdownComponent>

            <Box className={
              cn({
                'header-menu-wallet': true,
                'open': openWalletModal,
              })
            }
              onClick={() => setOpenWalletModal(true)}
            >
              <Image src="/assets/avatars/avatar.png" width={24} height={24} />
              <Typography variant="h5">{ellipsisAddress(address)}</Typography>
              <FontAwesomeIcon icon={faChevronDown} />
            </Box>
          </> :
          <ButtonComponent
            className={
              cn({
                'wallet-connect-button': true,
                'open': openConnectWalletModal,
              })
            }
            onClick={() => {
              setOpenConnectWalletModal(true);
            }}
          >
            <Typography variant="body2">Connect Wallet</Typography>
          </ButtonComponent>
      }
      {
        openConnectWalletModal &&
        <ConnectWalletModal
          chainData={chainData}
          chainOptions={isTestnet ? DEFAULT_TEST_CHAINS : DEFAULT_MAIN_CHAINS}
          uri={uri}
          onClose={onCloseConnectWalletModal}
          address={address}
          onConnect={onConnect}
        />
      }
      {
        openWalletModal &&
        <WalletModal
          onDisconnect={onDisconnect}
          onClose={() => setOpenWalletModal(false)}
          chainData={chainData}
          chainId={chainId}
          address={address}
          balances={balances}
          actions={getBlockchainActions(chainId)}
        />
      }
    </WalletComponentStyle>
  );
};