import { Container, useMediaQuery } from "@mui/material";
import { ApproveTransactionModal } from "components";
import Head from "next/head";
import { ReactNode } from "react";
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

  const { openTransactionApproval, approvingTransaction } = useSelector((state: RootState) => state.transaction);

  const setOpenTransactionApproval = (value: boolean) => {
    dispatch(AppActions.transaction.setOpenTransactionApproval(value));
  }

  const onConfirm = () => {
    dispatch(AppActions.transaction.approveTransaction({}));

    setTimeout(() => {
      dispatch(AppActions.transaction.approveTransactionSuccess({}));
    }, 1000);
  }

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
          approvingTransaction={approvingTransaction}
          onConfirm={() => { onConfirm() }}
          onClose={() => { setOpenTransactionApproval(false); }}
        />
      }
    </LayoutStyle>
  );
};
