import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { darkTheme, lightTheme } from 'styles/theme';
import { ThemeType } from 'consts';

export type IPlatformContext = {
  walletConnection: boolean,
  currency: string,
  getThemeType: () => ThemeType,
  saveTheme: (theme: ThemeType) => void,
  saveCurrency: (currency: string) => void,
  getWalletConnection: () => boolean,
  saveWalletConnectToken: (tokens: string) => void,
  resetSession: () => void
};

export const PlatformContext = createContext<IPlatformContext>({
  walletConnection: false,
  currency: 'USD',
  getThemeType: () => ThemeType.Light,
  saveTheme: () => { },
  saveCurrency: () => { },
  getWalletConnection: () => false,
  saveWalletConnectToken: () => { },
  resetSession: () => { },
});

type PlatformContextProviderProps = {
  children: React.ReactNode
}

export const PlatformContextProvider: React.FC<PlatformContextProviderProps> = ({ children }) => {

  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [currency, setCurrency] = useState<string>('USD');
  const [walletConnection, setWalletConnection] = useState<boolean>(false);

  const getThemeType = () => {
    return sessionStorage.getItem('theme') as ThemeType ?? ThemeType.Light;
  };

  const saveTheme = (themeType: ThemeType) => {
    sessionStorage.setItem('theme', themeType);
    setTheme(themeType === ThemeType.Light ? lightTheme : darkTheme);
  };

  const getCurrency = () => {
    return sessionStorage.getItem('currency') ?? 'USD';
  };

  const saveCurrency = (_currency: string) => {
    setCurrency(_currency);
    sessionStorage.setItem('currency', _currency);
  };
  const getWalletConnection = () => {
    return !!sessionStorage.getItem('wallet-token') ?? false;
  };

  const saveWalletConnectToken = (token: string) => {
    sessionStorage.setItem('wallet-token', token);
  };

  const resetSession = () => {
    sessionStorage.removeItem('theme');
  };

  useEffect(() => {
    const themeType = getThemeType();
    if (themeType === ThemeType.Dark)
      setTheme(darkTheme);
    if (themeType === ThemeType.Light)
      setTheme(lightTheme);

    setCurrency(getCurrency());
    setWalletConnection(getWalletConnection());
  }, []);

  return (
    <PlatformContext.Provider value={{
      walletConnection,
      currency,
      getThemeType,
      saveTheme,
      saveCurrency,
      getWalletConnection,
      saveWalletConnectToken,
      resetSession,
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PlatformContext.Provider>
  );
};
