import CssBaseline from '@mui/material/CssBaseline';
import { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@/Models/Theme.models';
import ThemeContext from '@/Contexts/ThemeContext';
import { Outlet } from 'react-router-dom';
import SideNavBar from '@/Components/SideNavBar/SideNavBar';

export function Layout() {
  const { mode } = useContext(ThemeContext);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <header>
            <SideNavBar children={<Outlet></Outlet>} />
          </header>
        </div>
      </ThemeProvider>
    </>
  );
}
