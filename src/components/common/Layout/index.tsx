import { Box, Snackbar, useMediaQuery } from "@mui/material";
import { AlertComponent, ApproveTransactionModal } from "components";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActions, RootState } from "store";
import { darkTheme } from "styles/theme";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutStyle } from "./index.style";

interface IProps {
  children?: ReactNode,
}

export const Layout: React.FC<IProps> = ({ children }) => {
  const isUpMd = useMediaQuery(darkTheme.breakpoints.up(darkTheme.breakpoints.values.lg));

  const dispatch = useDispatch();

  const { openTransactionApproval, approvingTransaction, sentTransaction, approvedTransaction, expenses } = useSelector((state: RootState) => state.transaction);

  const onCloseAlert = () => {
    dispatch(AppActions.transaction.resetSendTransactionState());
  }

  const setOpenTransactionApproval = (value: boolean) => {
    dispatch(AppActions.transaction.setOpenTransactionApproval(value));
  }

  const onConfirm = () => {
    dispatch(AppActions.transaction.approveTransaction({}));

    setTimeout(() => {
      dispatch(AppActions.transaction.approveTransactionSuccess({}));
    }, 1000);
  }

  useEffect(() => {
    if (approvedTransaction) {
      setTimeout(() => {
        dispatch(AppActions.transaction.sendTransactionSuccess());
      }, 3000);
    }
  }, [approvedTransaction])

  return (
    <LayoutStyle maxWidth="xl" style={{ padding: 0 }}>
      <Head>
        <title>Lisk Dex</title>
      </Head>
      <Header
        openTransactionApproval={openTransactionApproval}
        setOpenTransactionApproval={setOpenTransactionApproval}
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
          onConfirm={() => { onConfirm() }}
          onClose={() => { setOpenTransactionApproval(false); }}
        />
      }
      {
        <Snackbar open={sentTransaction} autoHideDuration={5000} onClose={onCloseAlert}>
          <Box>
            <AlertComponent
              subject="Transaction has been sent successfully"
              description="Confirmation is in progress, once confirmed you will receive another notification."
              onClose={onCloseAlert}
            />
          </Box>
        </Snackbar>
      }
    </LayoutStyle>
  );
};
