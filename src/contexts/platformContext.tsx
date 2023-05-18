import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { darkTheme, lightTheme } from 'styles/theme';
import { ThemeType } from 'consts';

type IPlatformContext = {
	getThemeType: () => ThemeType,
	saveTheme: (theme: ThemeType) => void,
	resetSession: () => void
};

export const PlatformContext = createContext<IPlatformContext>({
  getThemeType: () => ThemeType.Light,
  saveTheme: () => { },
  resetSession: () => { },
});

type PlatformContextProviderProps = {
	children: React.ReactNode
}

export const PlatformContextProvider: React.FC<PlatformContextProviderProps> = ({ children }) => {

  const [theme, setTheme] = useState<Theme>(lightTheme);

  const getThemeType = () => {
    return sessionStorage.getItem('theme') as ThemeType ?? ThemeType.Light;
  };

  const saveTheme = (themeType: ThemeType) => {
    sessionStorage.setItem('theme', themeType);
    setTheme(themeType === ThemeType.Light ? lightTheme : darkTheme);
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
  }, []);

  return (
    <PlatformContext.Provider value={{
      getThemeType,
      saveTheme,
      resetSession,
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PlatformContext.Provider>
  );
};
