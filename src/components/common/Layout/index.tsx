import { Box, Snackbar, useMediaQuery } from '@mui/material';
import { AlertComponent, ApproveTransactionModal, TransactionStatusModal } from 'components';
import { AlertVariant, PATHS, TransactionStatus, TransactionType } from 'consts';
import { PlatformContext } from 'contexts';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { darkTheme } from 'styles/theme';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutComponentStyle } from './index.style';

interface IProps {
  children?: ReactNode,
}

export const LayoutComponent: React.FC<IProps> = ({ children }) => {
  const isUpMd = useMediaQuery(darkTheme.breakpoints.up(darkTheme.breakpoints.values.lg));

  const dispatch = useDispatch();
  const router = useRouter();

  const platform = useContext(PlatformContext);

  const {
    transaction,
    openTransactionApproval,
    approvingTransaction,
    sentTransaction,
    sendingTransaction,
    approvedTransaction,
    confirmedTransaction,
    expenses,
  } = useSelector((state: RootState) => state.transaction);

  const [openTransactionStatusModal, setOpenTransactionStatusModal] = useState<boolean>(false);

  const { account } = useSelector((state: RootState) => state.wallet);

  //show Snackbar alert
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const alertContent = useMemo(() => {
    const alertContent = {
      variant: AlertVariant.info,
      subject: 'Transaction in progress...',
      description: '',
      link: ''
    };
    if (sentTransaction) {
      alertContent.subject = 'Transaction has been sent successfully';
      alertContent.description = 'Confirmation is in progress, once confirmed you will receive another notification.';
    }
    if (confirmedTransaction) {
      alertContent.variant = AlertVariant.success;
      alertContent.subject = 'Transaction has been confirmed.';
      alertContent.link = 'https://etherscan.io/';
      if (transaction.type === TransactionType.SWAP)
        alertContent.description = 'Swap 2335.45 LSK to 1.76 ETH.';
      if (transaction.type === TransactionType.SUPPLY_LIQUIDITY)
        alertContent.description = 'Added liquidity of 3.45 LSK/ETH LP tokens.';
      if (transaction.type === TransactionType.INCREASE_LIQUIDITY)
        alertContent.description = 'Increased liquidity by 4521 LSK and 2.74 ETH.';
      if (transaction.type === TransactionType.REMOVE_LIQUIDITY)
        alertContent.description = 'Removed liquidity by 1623 LSK and 1.82 ETH.';
    }
    return alertContent;
  }, [sentTransaction, confirmedTransaction, transaction]);

  const onCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const onCloseApproveTransactionModal = () => {
    dispatch(AppActions.transaction.setOpenTransactionApproval(false));

    setTimeout(() => {
      dispatch(AppActions.transaction.resetApproveTransactionState());
      dispatch(AppActions.transaction.resetSendTransactionState());
      setOpenTransactionStatusModal(false);
      setOpenAlert(false);
    }, 1000);
  };

  const onConfirm = () => {
    dispatch(AppActions.transaction.approveTransaction());
  };

  const onCloseTransactionStatusModal = () => {
    setOpenTransactionStatusModal(false);
    dispatch(AppActions.transaction.setCloseTransactionModal());
  };

  useEffect(() => {
    if (!account) {
      router.replace(PATHS.SWAP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (sendingTransaction) {
      setOpenTransactionStatusModal(true);
      //open alert after confirmation
      setTimeout(() => {
        setOpenAlert(true);
      }, 2000);

      //open transaction approval modal
      setTimeout(() => {
        dispatch(AppActions.transaction.setOpenTransactionApproval(true));
      }, 3000);
    }
  }, [sendingTransaction, dispatch]);

  useEffect(() => {
    //approve transaction
    if (approvingTransaction) {
      setTimeout(() => {
        dispatch(AppActions.transaction.approveTransactionSuccess());
      }, 1000);
    }
  }, [approvingTransaction, dispatch]);

  useEffect(() => {
    //send transaction success
    if (approvedTransaction) {
      setTimeout(() => {
        dispatch(AppActions.transaction.sendTransactionSuccess());
      }, 2000);
    }
  }, [approvedTransaction, dispatch]);

  useEffect(() => {
    //open alert for transaction sent
    if (sentTransaction) {
      setOpenAlert(true);

      setTimeout(() => {
        dispatch(AppActions.transaction.confirmTransactionSuccess());
      }, 5000);
    }
  }, [sentTransaction, dispatch]);

  useEffect(() => {
    if (confirmedTransaction) {
      setOpenAlert(true);
    }
  }, [confirmedTransaction]);

  return (
    <LayoutComponentStyle maxWidth="xl" style={{ padding: 0 }}>
      <Head>
        <title>Lisk Dex</title>
      </Head>
      <Header
        platform={platform}
      />
      {children}
      {
        isUpMd ? <></> : <Footer />
      }
      {
        openTransactionApproval &&
        <ApproveTransactionModal
          expenses={expenses}
          approvingTransaction={approvingTransaction}
          onConfirm={() => { onConfirm(); }}
          onClose={onCloseApproveTransactionModal}
        />
      }
      {
        openTransactionStatusModal &&
        <TransactionStatusModal
          status={TransactionStatus.SUCCESS}
          type={transaction.type}
          onClose={onCloseTransactionStatusModal}
        />
      }

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={onCloseAlert}>
        <Box>
          <AlertComponent
            variant={alertContent.variant}
            subject={alertContent.subject}
            link={alertContent.link || ''}
            description={alertContent.description}
            onClose={onCloseAlert}
          />
        </Box>
      </Snackbar>
    </LayoutComponentStyle>
  );
};

export const withLayout =
  (Page: React.FC): React.FC =>
    // eslint-disable-next-line react/display-name
    () => {
      return (
        <LayoutComponent>
          <Page />
        </LayoutComponent>
      );
    };