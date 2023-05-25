import cn from 'classnames';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import { WalletModalStyle } from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faChevronRight, faClockRotateLeft, faEllipsisVertical, faWallet } from '@fortawesome/free-solid-svg-icons';
import { mockTokens } from '__mock__';
import { useState } from 'react';
import { HistoryComponent } from './History';
import { IToken } from 'models';
import { TokenComponent } from './Token';

enum TABS {
  WALLET = 0,
  HISTORY = 1,
}

export interface IWalletModalProps {
  onClose: () => void,
}

export const WalletModal: React.FC<IWalletModalProps> = (props) => {
  const { onClose } = props;
  const [tab, setTab] = useState<TABS>(TABS.WALLET);
  const [token, setToken] = useState<IToken | null>(null);
  const onChangeTab = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  };

  return (
    <WalletModalStyle>
      <Box className="wallet-modal-background" onClick={onClose} />
      <Box className={
        cn({
          'wallet-modal-container': true,
        })
      }>
        {
          {
            [TABS.WALLET]: <>{
              token ? <TokenComponent token={token} onBack={() => setToken(null)} /> :
                <>
                  <Box className="wallet-header">
                    <Box className="wallet-header-top-box">
                      <IconButton className="wallet-menu-button">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </IconButton>
                      <Typography variant="body2">0x93...e57f</Typography>
                      <IconButton className="wallet-exit-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      </IconButton>
                    </Box>
                    <Box className="avatar-icon">
                      <Image src="/assets/avatars/avatar.png" width={40} height={40} />
                    </Box>
                    <Typography variant="body2">Total balance</Typography>
                    <Typography variant="h2">$48,642.45</Typography>
                  </Box>

                  <Box className="wallet-body">
                    <Typography variant="h4">Tokens</Typography>
                    {
                      mockTokens.map((token, index) => (
                        <Box
                          key={index}
                          className="token-item"
                          onClick={() => setToken(token)}
                        >
                          <Image src={token.image} width={40} height={40} />
                          <Box className="token-summary">
                            <Box className="token-summary-box top">
                              <Typography variant="body1">{token.name}</Typography>
                              <Typography variant="body2">20,452.45 {token.shortName}</Typography>
                            </Box>
                            <Box className="token-summary-box bottom">
                              <Typography variant="body2">{token.shortName}</Typography>
                              <Typography variant="body2">$22,452.45</Typography>
                            </Box>
                          </Box>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Box>
                      ))
                    })
                  </Box>
                </>
            }</>,
            [TABS.HISTORY]: <>
              <HistoryComponent />
            </>
          }[tab]
        }

        <Box className="wallet-footer">
          <Tabs
            className="wallet-tab"
            value={tab as number}
            onChange={onChangeTab}
            aria-label="icon position tabs example"
          >
            <Tab icon={<FontAwesomeIcon icon={faWallet} />} label="Wallet" />
            <Tab icon={<FontAwesomeIcon icon={faClockRotateLeft} />} label="History" />
          </Tabs>
        </Box>
      </Box>
    </WalletModalStyle >
  );
};