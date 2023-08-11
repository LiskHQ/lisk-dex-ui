import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import '../styles/globals.css';
import { createEmotionCache } from 'utils';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ChainDataContextProvider, ClientContextProvider, JsonRpcContextProvider, PlatformContextProvider } from 'contexts';

type AppPropsRoot = AppProps & { emotionCache: EmotionCache }
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppPropsRoot) {

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <PlatformContextProvider>
          <ChainDataContextProvider>
            <ClientContextProvider>
              <JsonRpcContextProvider>
                <AppStyle className="layout-app">
                  <Component {...pageProps} />
                </AppStyle>
              </JsonRpcContextProvider>
            </ClientContextProvider>
          </ChainDataContextProvider>
        </PlatformContextProvider>
      </CacheProvider>
    </Provider>
  );
}

const AppStyle = styled('div')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: theme.bg.primary
  };
});

export default MyApp;