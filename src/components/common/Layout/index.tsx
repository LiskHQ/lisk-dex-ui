import { useMediaQuery } from '@mui/material';
import { AlertVariant } from 'consts';
import { PlatformContext } from 'contexts';
import Head from 'next/head';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { SnackbarAlertComponent } from 'components';
import { darkTheme } from 'styles/theme';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutComponentStyle } from './index.style';

import { socket } from 'utils';
import { SOCKET_EVENTS } from 'consts';
import { NextPage } from 'next';


declare module 'notistack' {
  interface VariantOverrides {
    alert: {
      type?: AlertVariant;
      subject?: string;
      link?: string;
    };
  }
}

interface IProps {
  children?: ReactNode,
}

export const LayoutComponent: React.FC<IProps> = ({ children }) => {
  const isUpMd = useMediaQuery(darkTheme.breakpoints.up(darkTheme.breakpoints.values.lg));
  const platform = useContext(PlatformContext);

  // current socket event
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socketEvent, setSocketEvent] = useState<string>('');

  // useMemo(() => {
  //   // todo
  //   console.log('socketEvent: ', socketEvent);
  // }, [socketEvent]);

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
    <SnackbarProvider
      Components={{
        alert: SnackbarAlertComponent
      }}
    >
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
      </LayoutComponentStyle>
    </SnackbarProvider >
  );
};

export const withLayout =
  (Page: NextPage): React.FC =>
    // eslint-disable-next-line react/display-name
    () => {
      return (
        <LayoutComponent>
          <Page />
        </LayoutComponent>
      );
    };