import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent, InputComponent, SelectTokenModal } from 'components';
import { TransactionSettingsModal } from './TransactionSettingsModal';
import { SwapConfirmModal } from './SwapConfirmModal';
import { EditIcon, HelpIcon, SettingIcon, SwapIcon } from 'imgs/icons';
import { SwapViewStyle } from './index.style';
import { cryptoDecimalFormat, currencyDecimalFormat } from 'utils';
import { RootState } from 'store';
import { IAccount, IToken } from 'models';
import { LISK_DECIMALS } from 'consts';
import { mockConversionRate, mockEthtoLsk } from '__mock__';

export interface ISwapViewProps {
  account: IAccount | null,
  tokens: IToken[],
  closeTransactionModal: boolean,
  onConfirmSwap: () => void,
}

export const SwapView: React.FC<ISwapViewProps> = (props) => {
  const router = useRouter();
  const { account, tokens, closeTransactionModal, onConfirmSwap } = props;

  //flags for open modals
  const [openSelectToken1, setOpenSelectToken1] = useState<boolean>(false);
  const [openSelectToken2, setOpenSelectToken2] = useState<boolean>(false);
  const [openTransactionSettings, setOpenTransactionSettings] = useState<boolean>(false);
  const [openSwapConfirmModal, setOpenSwapConfirmModal] = useState<boolean>(false);

  const [token1, setToken1] = useState<IToken>(tokens[0]);
  const [token1Amount, setToken1Amount] = useState<number | string>('0.00');
  const [token2, setToken2] = useState<IToken>();
  const [splipageTolerance, setSplipageTolerance] = useState<number>(0.5);
  const [transactionDeadline, setTransactionDeadline] = useState<number>(20);
  const [reverseRate, setReverseRate] = useState<boolean>(false);

  const { token2FiatConversion } = useSelector((root: RootState) => root.token);

  const onSaveTransactionSettings = ({ splipageTolerance, transactionDeadline }: { splipageTolerance: number, transactionDeadline: number }) => {
    setSplipageTolerance(splipageTolerance);
    setTransactionDeadline(transactionDeadline);
    setOpenTransactionSettings(false);
  };

  const reverseSwap = () => {
    if (token2) {
      const token = token1;
      setToken1(token2);
      setToken2(token);
      setToken1Amount(0);
    }
  };

  const resetSwap = () => {
    setToken1Amount(0);
    setSplipageTolerance(0.5);
    setTransactionDeadline(20);
    setReverseRate(false);
  };

  const onEditSplipageTolerance = () => {
    setOpenTransactionSettings(true);
  };

  useEffect(() => {
    if (router) {
      const { query } = router;
      if (query) {
        if (query.token1) {
          setToken1(tokens.find(token => token.symbol === query.token1) as IToken);
        }
        if (query.token2) {
          setToken2(tokens.find(token => token.symbol === query.token2) as IToken);
        }
      }
    }
  }, [router, tokens]);

  useEffect(() => {
    // getToken2FiatConversion(token1.symbol, token2?.symbol);
  }, [token1, token2]);

  useEffect(() => {
    if (closeTransactionModal) {
      setToken1Amount(0);
      setSplipageTolerance(0.5);
      setTransactionDeadline(20);
      setReverseRate(false);
    }
  }, [closeTransactionModal]);

  const onSelectToken = (token: IToken) => {
    if (openSelectToken1) setToken1(token);
    if (openSelectToken2) setToken2(token);
  };

  const onCloseSelectToken = () => {
    setOpenSelectToken1(false);
    setOpenSelectToken2(false);
  };

  const balance = useMemo(() => {
    if (account && account.data) {
      return account.data.token.balance / (10 ** LISK_DECIMALS);
    } else {
      resetSwap();
    }
    return 0;
  }, [account]);

  useEffect(() => {
    if (closeTransactionModal) {
      resetSwap();
    }
  }, [closeTransactionModal]);

  return (
    <SwapViewStyle>
      <Box className="swap-container">
        <Box className="swap-header">
          <Typography variant="h3">Swap</Typography>
          <IconButton
            data-testid="swap-setting-button"
            onClick={() => { setOpenTransactionSettings(true); }}>
            <SettingIcon />
          </IconButton>
        </Box>
        <Typography className="swap-description" variant="body2">Trade tokens in an instant</Typography>
        <Box className="swap-from-box">
          <Box className="swap-from-top-box">
            <Typography variant="body1">From:</Typography>
            <Box className="swap-from-percent">
              <Typography data-testid="swap-from-percent-25" variant="body2" onClick={() => setToken1Amount(cryptoDecimalFormat(balance / 4))}>25%</Typography>
              <Typography data-testid="swap-from-percent-50" variant="body2" onClick={() => setToken1Amount(cryptoDecimalFormat(balance / 2))}>50%</Typography>
              <Typography data-testid="swap-from-percent-max" variant="body2" onClick={() => setToken1Amount(cryptoDecimalFormat(balance))}>MAX</Typography>
            </Box>
          </Box>
          <Box className="swap-from-mid-box">
            <Box className="swap-from-select-token" onClick={() => { setOpenSelectToken1(true); }}>
              <Image src={token1.image} width={28} height={28} alt="image" />
              <Typography variant="subtitle2">{token1.symbol}</Typography>
              <FontAwesomeIcon icon={faChevronDown} />
            </Box>
            <InputComponent
              type="number"
              value={token1Amount}
              onChange={e => setToken1Amount(e.target.value)}
            />
          </Box>
          <Box className="swap-from-bottom-box">
            <Typography variant="body2">Balance: {cryptoDecimalFormat(balance)}</Typography>
            <Typography variant="body2">{currencyDecimalFormat((token1Amount as number) * mockConversionRate, 'USD')}</Typography>
          </Box>
        </Box>

        <Box className="swap-icon">
          <IconButton onClick={reverseSwap}>
            <SwapIcon />
          </IconButton>
        </Box>

        <Box className="swap-to-box">
          <Box className="swap-to-main-box">
            <Box className="swap-to-top-box">
              <Typography variant="body1">To (estimated):</Typography>
            </Box>
            <Box className="swap-to-mid-box">
              <Box className="swap-to-select-token" onClick={() => { setOpenSelectToken2(true); }}>
                {
                  token2 ?
                    <>
                      <Image src={token2.image} width={28} height={28} />
                      <Typography variant="subtitle2">{token2.symbol}</Typography>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </> :
                    <>
                      <Typography variant="subtitle2">Select a token</Typography>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </>
                }
              </Box>
              <Typography variant="subtitle1">{cryptoDecimalFormat((token1Amount as number) / mockEthtoLsk)}</Typography>
            </Box>
            <Box className="swap-to-bottom-box">
              <Typography variant="body2">Balance: -</Typography>
              <Typography variant="body2">$0</Typography>
            </Box>
          </Box>
          {
            !!token2 && !!token1Amount &&
            <Box className="swap-to-price">
              <Typography variant="body2">Price:</Typography>
              <Box onClick={() => { setReverseRate(!reverseRate); }}>
                <Typography variant="body2">
                  {
                    !reverseRate ?
                      <>1 {token2.symbol} = {mockEthtoLsk} {token1.symbol}</> :
                      <>1 {token1.symbol} = {cryptoDecimalFormat(1 / mockEthtoLsk)} {token2.symbol}</>
                  }
                </Typography>
                <SwapIcon />
              </Box>
            </Box>
          }
        </Box>

        {
          !!token2 && !!token1Amount &&
          <Box className="swap-summary">
            <Box className="swap-summary-property slippage-tolerance">
              <Typography className="swap-summary-property-title" variant="body2">Slippage Tolerance <HelpIcon /></Typography>
              <Typography className="swap-summary-property-value" variant="body2" onClick={onEditSplipageTolerance}>{splipageTolerance}% <EditIcon /></Typography>
            </Box>
            <Box className="swap-summary-property price-impact">
              <Typography className="swap-summary-property-title" variant="body2">Price Impact <HelpIcon /></Typography>
              <Typography className="swap-summary-property-value" variant="body2">{'<0.21%'}</Typography>
            </Box>
            <Box className="swap-summary-property network-fee">
              <Typography className="swap-summary-property-title" variant="body2">Network Fee <HelpIcon /></Typography>
              <Typography className="swap-summary-property-value" variant="body2">~$1.72</Typography>
            </Box>
            <Box className="swap-summary-property minimum-received">
              <Typography className="swap-summary-property-title" variant="body2">Minimum Received <HelpIcon /></Typography>
              <Typography className="swap-summary-property-value" variant="body2">{cryptoDecimalFormat(+token1Amount / mockEthtoLsk)} {token2.symbol}</Typography>
            </Box>
          </Box>
        }

        <ButtonComponent
          data-testid="swap-button"
          disabled={!token2 || !token1Amount || !account}
          onClick={() => { setOpenSwapConfirmModal(true); }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {
              !account ? 'Connect wallet' : !token2 ? 'Select tokens' : !token1Amount ? 'Enter Amount' : 'Swap'
            }
          </Typography>
        </ButtonComponent>
        {
          (openSelectToken1 || openSelectToken2) &&
          <SelectTokenModal
            tokens={tokens}
            onSelect={onSelectToken}
            onClose={onCloseSelectToken}
          />
        }
        {
          openTransactionSettings &&
          <TransactionSettingsModal
            splipageTolerance={splipageTolerance}
            transactionDeadline={transactionDeadline}
            onSave={onSaveTransactionSettings}
            onClose={() => { setOpenTransactionSettings(false); }}
          />
        }
        {
          openSwapConfirmModal &&
          <SwapConfirmModal
            toFiatRate={mockConversionRate}
            toTokenRate={mockEthtoLsk}
            token2={token2 as IToken}
            fromAmount={+token1Amount}
            splipageTolerance={splipageTolerance}
            onConfirm={() => { onConfirmSwap(); setOpenSwapConfirmModal(false); }}
            onClose={() => { setOpenSwapConfirmModal(false); }}
          />
        }
      </Box>
    </SwapViewStyle>
  );
};