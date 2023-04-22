import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, IconButton, Typography } from "@mui/material";
import { EditIcon, HelpIcon, SettingIcon, SwapIcon, tokenSvgs } from "imgs/icons";
import { SwapViewStyle } from './index.style';
import { ButtonComponent } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SelectTokenModal } from "../../common/SelectTokenModal";
import { IToken } from "models";
import { mockConversionRate, mockEthtoLsk } from "__mock__";
import { SwapConfirmModal } from "./SwapConfirmModal";
import { TransactionSettings } from "./TransactionSettings";

export interface ISwapViewProps {
  balance: number,
  tokens: IToken[],
  closeTransactionModal: boolean,
  onConfirmSwap: () => void,
  fetchPrices: () => void,
}

export const SwapView: React.FC<ISwapViewProps> = (props) => {
  const { balance, tokens, closeTransactionModal, onConfirmSwap, fetchPrices } = props;

  //flags for open modals
  const [openSelectTokenModal, setOpenSelectTokenModal] = useState<boolean>(false);
  const [openTransactionSettings, setOpenTransactionSettings] = useState<boolean>(false);
  const [openSwapConfirmModal, setOpenSwapConfirmModal] = useState<boolean>(false);

  const [fromBalance, setFromBalance] = useState<number>(0);
  const [splipageTolerance, setSplipageTolerance] = useState<number>(0.5);
  const [transactionDeadline, setTransactionDeadline] = useState<number>(20);
  const [reverseRate, setReverseRate] = useState<boolean>(false);

  const [toToken, setToToken] = useState<IToken | null>();

  const onSaveTransactionSettings = ({ splipageTolerance, transactionDeadline }: { splipageTolerance: number, transactionDeadline: number }) => {
    setSplipageTolerance(splipageTolerance);
    setTransactionDeadline(transactionDeadline);
    setOpenTransactionSettings(false);
  }

  const onEditSplipageTolerance = () => {
    setOpenTransactionSettings(true);
  }

  useEffect(() => {
    if (fromBalance) {
      //      fetchPrices();
    }
  }, [fromBalance]);

  useEffect(() => {
    if (closeTransactionModal) {
      setFromBalance(0);
      setSplipageTolerance(0.5);
      setTransactionDeadline(20);
      setReverseRate(false);
      setToToken(null);
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
              <Typography data-testid="swap-from-percent-25" variant="body2" onClick={() => { setFromBalance(balance / 4); }}>25%</Typography>
              <Typography data-testid="swap-from-percent-50" variant="body2" onClick={() => { setFromBalance(balance / 2); }}>50%</Typography>
              <Typography data-testid="swap-from-percent-max" variant="body2" onClick={() => { setFromBalance(balance); }}>MAX</Typography>
            </Box>
          </Box>
          <Box className="swap-from-mid-box">
            <Box className="swap-from-select-token">
              <Image src={tokenSvgs.LSK} width={28} height={28} alt="image" />
              <Typography variant="subtitle2">LSK</Typography>
              <FontAwesomeIcon icon={faChevronDown} />
            </Box>
            <Typography variant="subtitle2">{fromBalance.toFixed(2)}</Typography>
          </Box>
          <Box className="swap-from-bottom-box">
            <Typography variant="body2">Balance: {balance}</Typography>
            <Typography variant="body2">${(fromBalance * mockConversionRate).toFixed(2)}</Typography>
          </Box>
        </Box>

        <Box className="swap-icon">
          <Box>
            <SwapIcon />
          </Box>
        </Box>

        <Box className="swap-to-box">
          <Box className="swap-to-main-box">
            <Box className="swap-to-top-box">
              <Typography variant="body1">To (estimated):</Typography>
            </Box>
            <Box className="swap-to-mid-box">
              <Box className="swap-to-select-token" onClick={() => { setOpenSelectTokenModal(true); }}>
                {
                  toToken ?
                    <>
                      <Image src={toToken.image} width={28} height={28} />
                      <Typography variant="subtitle2">{toToken.shortName}</Typography>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </> :
                    <>
                      <Typography variant="subtitle2">Select a token</Typography>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </>
                }
              </Box>
              <Typography variant="subtitle2">{(fromBalance / mockEthtoLsk).toFixed(2)}</Typography>
            </Box>
            <Box className="swap-to-bottom-box">
              <Typography variant="body2">Balance: -</Typography>
              <Typography variant="body2">$0</Typography>
            </Box>
          </Box>
          {
            !!toToken && !!fromBalance &&
            <Box className="swap-to-price">
              <Typography variant="body2">Price:</Typography>
              <Box onClick={() => { setReverseRate(!reverseRate) }}>
                <Typography variant="body2">
                  {
                    !reverseRate ?
                      <>1 {toToken?.shortName} = {mockEthtoLsk} LSK</> :
                      <>1 LSK = {(1 / mockEthtoLsk).toFixed(4)} {toToken?.shortName}</>
                  }
                </Typography>
                <SwapIcon />
              </Box>
            </Box>
          }
        </Box>

        {
          !!toToken && !!fromBalance &&
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
              <Typography className="swap-summary-property-value" variant="body2">{(fromBalance / mockEthtoLsk).toFixed(2)} {toToken.shortName}</Typography>
            </Box>
          </Box>
        }

        <ButtonComponent
          data-testid="swap-button"
          disabled={!toToken || !fromBalance}
          onClick={() => { setOpenSwapConfirmModal(true); }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {
              !toToken ? "Select tokens" : !fromBalance ? "Enter Amount" : "Swap"
            }
          </Typography>
        </ButtonComponent>
        {
          openSelectTokenModal &&
          <SelectTokenModal
            tokens={tokens}
            onSelect={(value: IToken) => { setToToken(value); }}
            onClose={() => { setOpenSelectTokenModal(false); }}
          />
        }
        {
          openTransactionSettings &&
          <TransactionSettings
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
            toToken={toToken as IToken}
            fromAmount={fromBalance}
            splipageTolerance={splipageTolerance}
            onConfirm={() => { onConfirmSwap(); setOpenSwapConfirmModal(false); }}
            onClose={() => { setOpenSwapConfirmModal(false); }}
          />
        }
      </Box>
    </SwapViewStyle>
  )
}