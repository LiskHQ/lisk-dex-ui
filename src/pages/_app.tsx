import type { AppProps } from 'next/app';
import { LayoutTree } from "@moxy/next-layout";
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';

import '../styles/globals.css';
import { darkTheme, lightTheme } from '../styles/theme';
import { createEmotionCache } from '../utils';

type AppPropsRoot = AppProps & { emotionCache: EmotionCache }
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppPropsRoot) {
  return (
    // <Provider store={store}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AppStyle className="layout-app">
          <LayoutTree Component={Component} pageProps={pageProps} />
        </AppStyle>
      </ThemeProvider>
    </CacheProvider>
    // </Provider>
  )
}

const AppStyle = styled('div')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh',
    background: theme.bg.primary
  }
})

export default MyApp