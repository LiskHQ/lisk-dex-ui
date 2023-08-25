import { Box, Snackbar, useMediaQuery } from '@mui/material';
import { AlertComponent } from 'components';
import { AlertVariant } from 'consts';
import { PlatformContext } from 'contexts';
import Head from 'next/head';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { darkTheme } from 'styles/theme';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutComponentStyle } from './index.style';

import { socket } from 'utils';
import { SOCKET_EVENTS } from 'consts';

interface IProps {
  children?: ReactNode,
}

export const LayoutComponent: React.FC<IProps> = ({ children }) => {
  const isUpMd = useMediaQuery(darkTheme.breakpoints.up(darkTheme.breakpoints.values.lg));
  const platform = useContext(PlatformContext);

  const { account } = useSelector((state: RootState) => state.wallet);

  // current socket event
  const [socketEvent, setSocketEvent] = useState<string>('');

  //show Snackbar alert
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const alertContent = useMemo(() => {
    const alertContent = {
      variant: AlertVariant.info,
      subject: 'Transaction in progress...',
      description: '',
      link: ''
    };

    if (socketEvent !== '') {
      if (socketEvent === SOCKET_EVENTS.SWAPPED) {
        alertContent.description = 'Swap 2335.45 LSK to 1.76 ETH.';
      }
      if (socketEvent === SOCKET_EVENTS.SWAP_FAILED) {
        alertContent.variant = AlertVariant.fail;
        alertContent.description = 'Swap 2335.45 LSK to 1.76 ETH failed.';
      }
      if (socketEvent === SOCKET_EVENTS.POSITION_CREATED) {
        alertContent.variant = AlertVariant.success;
        alertContent.description = 'Pool has been created successfully.';
      }
      if (socketEvent === SOCKET_EVENTS.POSITION_CREATION_FAILED) {
        alertContent.variant = AlertVariant.fail;
        alertContent.description = 'There is an error ocurried during creating your pool.';
      }

      setOpenAlert(true);
    }
    return alertContent;
  }, [socketEvent]);

  const onCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (!account) {
      // router.replace(PATHS.SWAP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    const onConnect = () => {
      console.log('Web socket has been connected.');
    };

    const onDisconnect = () => {
      console.log('Web socket has been disonnected.');
    };

    socket.on(SOCKET_EVENTS.SOCKET_CONNECT, onConnect);
    socket.on(SOCKET_EVENTS.SOCKET_DISCONNECT, onDisconnect);

    socket.on(SOCKET_EVENTS.POOL_CREATED, () => {
      setSocketEvent(SOCKET_EVENTS.POOL_CREATED);
    });

    socket.on(SOCKET_EVENTS.POOL_CREATION_FAILED, () => {
      setSocketEvent(SOCKET_EVENTS.POOL_CREATION_FAILED);
    });

    socket.on(SOCKET_EVENTS.POSITION_CREATED, () => {
      setSocketEvent(SOCKET_EVENTS.POSITION_CREATED);
    });

    socket.on(SOCKET_EVENTS.POSITION_CREATION_FAILED, () => {
      setSocketEvent(SOCKET_EVENTS.POSITION_CREATION_FAILED);
    });

    socket.on(SOCKET_EVENTS.POSITION_UPDATED, () => {
      setSocketEvent(SOCKET_EVENTS.POSITION_UPDATED);
    });

    socket.on(SOCKET_EVENTS.POSITION_UPDATE_FAILED, () => {
      setSocketEvent(SOCKET_EVENTS.POSITION_UPDATE_FAILED);
    });

    socket.on(SOCKET_EVENTS.FEES_INCENTIVES_COLLECTED, () => {
      setSocketEvent(SOCKET_EVENTS.FEES_INCENTIVES_COLLECTED);
    });

    socket.on(SOCKET_EVENTS.AMOUNT_BELOW_MIN, () => {
      setSocketEvent(SOCKET_EVENTS.AMOUNT_BELOW_MIN);
    });

    socket.on(SOCKET_EVENTS.SWAPPED, () => {
      setSocketEvent(SOCKET_EVENTS.SWAPPED);
    });

    socket.on(SOCKET_EVENTS.SWAP_FAILED, () => {
      setSocketEvent(SOCKET_EVENTS.SWAP_FAILED);
    });

    return () => {
      socket.off(SOCKET_EVENTS.SOCKET_CONNECT, onConnect);
      socket.off(SOCKET_EVENTS.SOCKET_DISCONNECT, onDisconnect);
    };
  }, []);

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