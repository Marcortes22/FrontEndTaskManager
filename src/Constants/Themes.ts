import { createTheme } from '@mui/material';

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
