import { createTheme } from '@mui/material';

import { ReactNode } from 'react';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {},
    secondary: {
      main: '#2B2B2E',
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#F5F5F5',
    },
  },
});

export type ThemeContextType = {
  mode: string;
  setMode: (mode: string) => void;
  backgroundImage: string;
  setBackgroundImage: (backgroundImage: string) => void;
};

export interface ThemeContextProviderProps {
  children: ReactNode;
}
