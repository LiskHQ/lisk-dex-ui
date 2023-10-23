import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, FormHelperText, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent, InputComponent, SelectTokenModal } from 'components';
import { TransactionSettingsModal } from './TransactionSettingsModal';
import { SwapConfirmModal } from './SwapConfirmModal';
import { EditIcon, HelpIcon, SettingIcon, SwapIcon } from 'imgs/icons';
import { SwapViewStyle } from './index.style';
import { cryptoDecimalFormat, currencyDecimalFormat, getDisplayTokenAmount } from 'utils';
import { RootState } from 'store';
import { PlatformContext } from 'contexts';
import { IAccount, ISwapData, IToken, ITokenBalance } from 'models';
import { validationErrorMessages } from 'consts';

export interface ISwapViewProps {
  account: IAccount | null,
  tokens: IToken[],
  tokenBalances: ITokenBalance[],
  closeTransactionModal: boolean,
  onConfirmSwap: (data: ISwapData) => void,
  getToken2FiatConversion: (tokenSymbol: string, currency: string) => void,
}

export const SwapView: React.FC<ISwapViewProps> = (props) => {
  const router = useRouter();
  const { account, tokens, tokenBalances, closeTransactionModal, onConfirmSwap, getToken2FiatConversion } = props;

  //flags for open modals
  const [openSelectToken1, setOpenSelectToken1] = useState<boolean>(false);
  const [openSelectToken2, setOpenSelectToken2] = useState<boolean>(false);
  const [openTransactionSettings, setOpenTransactionSettings] = useState<boolean>(false);
  const [openSwapConfirmModal, setOpenSwapConfirmModal] = useState<boolean>(false);

  const [token1, setToken1] = useState<IToken>();
  const [token1Amount, setToken1Amount] = useState<number | string>('0.00');
  const [token2, setToken2] = useState<IToken>();
  const [splipageTolerance, setSplipageTolerance] = useState<number>(0.5);
  const [transactionDeadline, setTransactionDeadline] = useState<number>(20);
  const [reverseRate, setReverseRate] = useState<boolean>(false);

  const { conversionRates } = useSelector((root: RootState) => root.token);
  const { currency } = useContext(PlatformContext);

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
      if (query && tokens.length) {
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
    if (token1)
      getToken2FiatConversion(token1.symbol, currency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1, currency]);

  useEffect(() => {
    if (token2) {
      getToken2FiatConversion(token2.symbol, currency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token2, currency]);

  useEffect(() => {
    if (closeTransactionModal) {
      setToken1Amount(0);
      setSplipageTolerance(0.5);
      setTransactionDeadline(20);
      setReverseRate(false);
    }
  }, [closeTransactionModal]);

  const onSelectToken = (token: IToken) => {
    if (openSelectToken1 && token.symbol !== token2?.symbol) setToken1(token);
    if (openSelectToken2 && token.symbol !== token1?.symbol) setToken2(token);
  };

  const onCloseSelectToken = () => {
    setOpenSelectToken1(false);
    setOpenSelectToken2(false);
  };

  const balance = useMemo(() => {
    if (token1)
      return +getDisplayTokenAmount(+(tokenBalances.find(el => el.tokenID === token1?.tokenID)?.availableBalance || 0), token1);
    return 0;
  }, [token1, tokenBalances]);

  useEffect(() => {
    if (tokenBalances.length > 0)
      setToken1(tokens.find(el => el.tokenID === tokenBalances[0].tokenID));
  }, [tokenBalances, tokens]);

  useEffect(() => {
    if (!account) {
      resetSwap();
    }
  }, [account]);

  useEffect(() => {
    if (closeTransactionModal) {
      resetSwap();
    }
  }, [closeTransactionModal]);

  const estimatedAmount: number = useMemo(() => {
    if (token2 && token1)
      return (token1Amount as number) * (conversionRates[token1.symbol][token2.symbol] || 0);
    return 0;
  }, [token1Amount, token1, token2, conversionRates]);

  const isValidSwap = useMemo(() => {
    if (+token1Amount > balance || token1?.symbol === token2?.symbol || estimatedAmount === 0)
      return false;
    return true;
  }, [balance, token1Amount, token1, token2, estimatedAmount]);

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
              {
                token1 &&
                <>
                  <img src={token1.logo.png} alt={token1.symbol} width={28} height={28} style={{ borderRadius: '100%' }} />
                  <Typography variant="subtitle2">{token1.symbol}</Typography>
                </>
              }
              <FontAwesomeIcon icon={faChevronDown} />
            </Box>
            <InputComponent
              type="number"
              value={token1Amount}
              onChange={e => setToken1Amount(e.target.value)}
              onBlur={() => { setToken1Amount(cryptoDecimalFormat(+token1Amount)); }}
            />
          </Box>
          {
            +token1Amount > +balance &&
            <FormHelperText className="swap-from-input-error">
              <Typography variant='body2'>{validationErrorMessages.NOT_ENOUGH_BALANCE}</Typography>
            </FormHelperText>
          }
          <Box className="swap-from-bottom-box">
            <Typography variant="body2">Balance: {cryptoDecimalFormat(balance)}</Typography>
            {
              token1 &&
              <Typography variant="body2">{currencyDecimalFormat((token1Amount as number) * conversionRates[token1.symbol][currency], currency)}</Typography>
            }
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
                      <img src={token2.logo.png} alt={token2.symbol} width={28} height={28} style={{ borderRadius: '100%' }} />
                      <Typography variant="subtitle2">{token2.symbol}</Typography>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </> :
                    <>
                      <Typography variant="subtitle2">Select a token</Typography>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </>
                }
              </Box>
              {
                token2 &&
                <Typography variant="subtitle1">{cryptoDecimalFormat(estimatedAmount)}</Typography>
              }
            </Box>
            <Box className="swap-to-bottom-box">
              <Typography variant="body2">Balance: {
                token2 ? getDisplayTokenAmount(+(tokenBalances.find(el => el.tokenID === token2.tokenID)?.availableBalance || 0), token2) : '-'
              }
              </Typography>
              {
                token1 && token2 &&
                <Typography variant="body2">{currencyDecimalFormat((token1Amount as number) * conversionRates[token1.symbol][currency] * conversionRates[token1.symbol][token2.symbol], currency)}</Typography>
              }
            </Box>
          </Box>
          {
            token1 && token2 && !!token1Amount &&
            <Box className="swap-to-price">
              <Typography variant="body2">Price:</Typography>
              <Box onClick={() => { setReverseRate(!reverseRate); }}>
                <Typography variant="body2">
                  {
                    !reverseRate ?
                      <>1 {token2.symbol} = {(conversionRates[token1.symbol][token2.symbol] || 0)} {token1.symbol}</> :
                      <>1 {token1.symbol} = {cryptoDecimalFormat(1 / (conversionRates[token1.symbol][token2.symbol] || 0))} {token2.symbol}</>
                  }
                </Typography>
                <SwapIcon />
              </Box>
            </Box>
          }
        </Box>

        {
          token1 && token2 && !!token1Amount &&
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
              <Typography className="swap-summary-property-value" variant="body2">{cryptoDecimalFormat(+token1Amount * (conversionRates[token1.symbol][token2.symbol] || 0))} {token2.symbol}</Typography>
            </Box>
          </Box>
        }

        <ButtonComponent
          data-testid="swap-button"
          disabled={!token2 || !token1Amount || !account || !isValidSwap}
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
            tokenBalances={tokenBalances}
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
          openSwapConfirmModal && token2 &&
          <SwapConfirmModal
            tokenIn={token1 as IToken}
            tokenOut={token2 as IToken}
            amountIn={+token1Amount}
            estimatedAmount={estimatedAmount}
            currency={currency}
            conversionRates={conversionRates}
            splipageTolerance={splipageTolerance}
            onConfirm={onConfirmSwap}
            onClose={() => { setOpenSwapConfirmModal(false); }}
          />
        }
      </Box>
    </SwapViewStyle>
  );
};