import cn from 'classnames';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { CancelIcon, CopyIcon, LiskIcon } from 'imgs/icons';
import { ConnectWalletModalStyle } from './index.style';
import QRCode from 'react-qr-code';
import { LoaderComponent } from 'components/common/Loader';
import { useState } from 'react';
import { CheckCircleIcon } from 'imgs/icons/CheckCircleIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

export interface IConnectWalletModalProps {
  uri: string,
  onConnect: () => void,
  onClose: () => void,
}

export const ConnectWalletModal: React.FC<IConnectWalletModalProps> = (props) => {
  const { uri, onConnect, onClose } = props;

  const [isConnected] = useState<boolean>(true);
  const [isConnecting] = useState<boolean>(false);
  const [error] = useState<boolean>(false);

  return (
    <ConnectWalletModalStyle>
      <Box className="connect-wallet-modal-background" onClick={onClose} />
      <Box className={
        cn({
          'connect-wallet-modal-container': true,
          request: !!uri
        })
      }>
        <Box className="select-wallet-header">
          {
            uri ?
              <>
                <Box className="lisk-dex-icon">
                  <LiskIcon />
                </Box>
                <Typography variant="h4">Hello there !</Typography>
                <Typography variant="body2">Scan the QR code or copy the request string and paste it into your wallet to connect your account</Typography>

                <IconButton onClick={onClose}>
                  <CancelIcon />
                </IconButton>
              </>
              :
              <>
                <Typography variant="h4">Select a wallet</Typography>
                <Typography variant="body2">By connecting a wallet, you agree
                  to Lisk DEX’s <Link>Privacy Policy</Link>.</Typography>
              </>
          }
        </Box>

        <Box className="select-wallet-body">
          {
            uri ?
              <Box>
                <QRCode className="request-qr-code" value={uri} />
                <Typography variant="body2">or</Typography>
                <Box className="request-copy">
                  <CopyIcon />
                  <Typography variant="body2">Copy request</Typography>
                </Box>
              </Box> :
              <>
                <Box className="network-item">
                  <Box className="lisk-dex">
                    <Box className="lisk-dex-icon">
                      <LiskIcon />
                    </Box>
                    <Typography variant="h4">Lisk DEX</Typography>
                  </Box>

                  <Typography variant="body2" onClick={onConnect}>Connet</Typography>
                </Box>

                <Box className="close-button">
                  <Typography variant="body1" onClick={onClose}>Close</Typography>
                </Box>
              </>
          }
        </Box>

        {
          uri &&
          <Box
            className={
              cn({
                'select-wallet-footer': true,
                'connecting': isConnecting,
                'connected': isConnected,
                'error': error,
              })
            }
          >
            {
              isConnecting &&
              <>
                <LoaderComponent />
                <Typography variant="body2">Awaiting for connection...</Typography>
              </>
            }
            {
              isConnected &&
              <>
                <CheckCircleIcon />
                <Typography variant="body2">Connected</Typography>
              </>
            }
            {
              error &&
              <>
                <FontAwesomeIcon icon={faCircleXmark} />
                <Typography variant="body2">Failed to connect</Typography>
              </>
            }
          </Box>
        }
      </Box>
    </ConnectWalletModalStyle >
  );
};