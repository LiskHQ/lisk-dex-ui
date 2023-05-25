import { Box, MenuItem, Typography } from '@mui/material';
import { ButtonComponent, DropdownComponent } from 'components';
import { LiskIcon } from 'imgs/icons';
import { ellipsisAddress } from 'utils';
import { WalletComponentStyle } from './index.style';
import Image from 'next/image';
import { useState } from 'react';
import { ConnectWalletModal } from './ConnectWalletModal';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { WalletModal } from './WalletModal';

interface IWalletComponentProps {
  walletConnection: boolean,
}

export const WalletComponent: React.FC<IWalletComponentProps> = (props) => {
  const { walletConnection } = props;

  const [openConnectWalletModal, setOpenConnectWalletModal] = useState<boolean>(false);
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  const [requestString, setRequestString] = useState<string>('');

  const onConnect = () => {
    setRequestString('lisk-dex');
  };

  return (
    <WalletComponentStyle>
      {
        walletConnection ?
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
              <Typography variant="h5">{ellipsisAddress('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')}</Typography>
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
          requestString={requestString}
          onClose={() => setOpenConnectWalletModal(false)}
          onConnect={onConnect}
        />
      }
      {
        openWalletModal &&
        <WalletModal
          onClose={() => setOpenWalletModal(false)}
        />
      }
    </WalletComponentStyle>
  );
};