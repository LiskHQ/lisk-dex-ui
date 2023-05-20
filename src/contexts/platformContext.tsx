import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { darkTheme, lightTheme } from 'styles/theme';
import { ThemeType } from 'consts';

export type IPlatformContext = {
  currency: string,
  getThemeType: () => ThemeType,
  saveTheme: (theme: ThemeType) => void,
  saveCurrency: (currency: string) => void,
  resetSession: () => void
};

export const PlatformContext = createContext<IPlatformContext>({
  currency: 'USD',
  getThemeType: () => ThemeType.Light,
  saveTheme: () => { },
  saveCurrency: () => { },
  resetSession: () => { },
});

type PlatformContextProviderProps = {
  children: React.ReactNode
}

export const PlatformContextProvider: React.FC<PlatformContextProviderProps> = ({ children }) => {

  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [currency, setCurrency] = useState<string>('USD');

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
    setCurrency(_currency)
    sessionStorage.setItem('currency', _currency);
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
  }, []);

  return (
    <PlatformContext.Provider value={{
      currency,
      getThemeType,
      saveTheme,
      saveCurrency,
      resetSession,
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PlatformContext.Provider>
  );
};
