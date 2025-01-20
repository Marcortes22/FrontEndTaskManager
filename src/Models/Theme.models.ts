import { createTheme } from '@mui/material';

import { ReactNode } from 'react';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {},
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
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
