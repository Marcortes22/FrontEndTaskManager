import { CssBaseline } from '@mui/material';
import AppProvider from '../Providers/AppProvider';
import { AppRouter } from '../Router/AppRouter';
export default function App() {
  return (
    <>
      <CssBaseline />
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </>
  );
}
