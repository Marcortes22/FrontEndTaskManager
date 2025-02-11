import { CssBaseline } from '@mui/material';
import AppProvider from '../Providers/AppProvider';
import { AppRouter } from '../Router/AppRouter';
import BackDrop from '@/Components/BackDrop/BackDrop';
export default function App() {
  return (
    <>
      <CssBaseline />
      <BackDrop />
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </>
  );
}
