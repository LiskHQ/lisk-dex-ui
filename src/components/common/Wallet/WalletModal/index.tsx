import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Box, IconButton, MenuItem, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import { WalletModalStyle } from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faChevronRight, faClockRotateLeft, faEllipsisVertical, faUpRightFromSquare, faWallet } from '@fortawesome/free-solid-svg-icons';
import { HistoryComponent } from './History';
import { IAccount, IToken } from 'models';
import { TokenComponent } from './Token';
import { ellipsisAddress, getFiatfromToken } from 'utils';
import { CheckCircleIcon, CopyIcon, tokenSvgs } from 'imgs/icons';
import { mockConversionRate } from '__mock__';
import { AppActions, RootState } from 'store';

enum TABS {
  WALLET = 0,
  HISTORY = 1,
}

export interface IWalletModalProps {
  account?: IAccount,
  onClose: () => void,
  onDisconnect: () => void,
}

export const WalletModal: React.FC<IWalletModalProps> = (props) => {
  const dispatch = useDispatch();
  const { account, onClose, onDisconnect } = props;
  const [tab, setTab] = useState<TABS>(TABS.WALLET);
  const [token, setToken] = useState<IToken | null>(null);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const [menuAddressCopied, setMenuAddressCopied] = useState<boolean>(false);
  const [openWalletMenu, setOpenWalletMenu] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const { accountTokens, availableTokens } = useSelector((root: RootState) => root.token);

  const onChangeTab = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  };

  const onCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setAddressCopied(true);
    }
  };

  const onMenuCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setMenuAddressCopied(true);
    }
  };

  useEffect(() => {
    if (account && account.address) {
      setAddress(account.address);
      dispatch(AppActions.token.getAccountTokens({
        address: account.address,
      }));
      dispatch(AppActions.token.getAvailableTokens());
    }
  }, [account, dispatch]);

  useEffect(() => {
    if (addressCopied) {
      setTimeout(() => {
        setAddressCopied(false);
      }, 3000);
    }
  }, [addressCopied]);

  useEffect(() => {
    if (menuAddressCopied) {
      setTimeout(() => {
        setMenuAddressCopied(false);
      }, 3000);
    }
  }, [menuAddressCopied]);

  const onViewLiskscan = () => {
    window.open(`https://liskscan.com/account/${address}`, '_blank');
  };

  const balance = useMemo(() => {
    return 0;
  }, []);

  const getTokenDetail = (tokenID: string) => {
    return availableTokens.find(el => el.tokenID === tokenID);
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
                      <IconButton className="wallet-menu-button" onClick={() => setOpenWalletMenu(!openWalletMenu)}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </IconButton>
                      {
                        openWalletMenu &&
                        <Box className="wallet-menu">
                          <MenuItem className={menuAddressCopied ? 'menu-copied-address' : ''} onClick={onMenuCopyAddress}>
                            {
                              menuAddressCopied ?
                                <>
                                  <CheckCircleIcon />
                                  <Typography variant="body2">Copied Address</Typography>
                                </> :
                                <>
                                  <CopyIcon />
                                  <Typography variant="body2">Copy Address</Typography>
                                </>
                            }
                          </MenuItem>
                          <MenuItem onClick={onViewLiskscan}>
                            <FontAwesomeIcon icon={faUpRightFromSquare} />
                            <Typography variant="body2">View on Liskscan</Typography>
                          </MenuItem>
                        </Box>
                      }
                      <Typography className="wallet-address" variant="body2" onClick={onCopyAddress}>{ellipsisAddress(address || '')}</Typography>
                      {
                        addressCopied &&
                        <Box className="copied-alert">
                          <CheckCircleIcon />
                          <Typography variant="body2">Copied Address</Typography>
                        </Box>
                      }
                      <IconButton className="wallet-exit-button" onClick={onDisconnect}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      </IconButton>
                    </Box>
                    <Box className="avatar-icon">
                      <Image src="/assets/avatars/avatar.png" width={40} height={40} />
                    </Box>
                    <Typography variant="body2">Total balance</Typography>
                    <Typography variant="h2">${getFiatfromToken(balance, mockConversionRate)}</Typography>
                  </Box>

                  <Box className="wallet-body">
                    <Typography variant="h4">Tokens</Typography>
                    {
                      accountTokens.map(token =>
                        <Box
                          className="token-item"
                          key={token.tokenID}
                          onClick={() => setToken(token)}
                        >
                          <Image src={tokenSvgs[getTokenDetail(token.tokenID)?.symbol || 'LSK']} width={40} height={40} />
                          <Box className="token-summary">
                            <Box className="token-summary-box top">
                              <Typography variant="body1">{getTokenDetail(token.tokenID)?.tokenName}</Typography>
                              <Typography variant="body2">{token.avaialbleBalance} {getTokenDetail(token.tokenID)?.symbol}</Typography>
                            </Box>
                            <Box className="token-summary-box bottom">
                              <Typography variant="body2">{getTokenDetail(token.tokenID)?.symbol}</Typography>
                              <Typography variant="body2">${getFiatfromToken(balance, mockConversionRate)}</Typography>
                            </Box>
                          </Box>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Box>)
                    }
                  </Box>
                </>
            }</>,
            [TABS.HISTORY]: <>
              <HistoryComponent accountAddress={address} />
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