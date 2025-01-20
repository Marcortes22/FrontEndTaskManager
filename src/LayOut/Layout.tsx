import { useAuth0 } from '@auth0/auth0-react';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@/Models/Theme.models';
import ThemeContext from '@/Contexts/ThemeContext';
import { Outlet } from 'react-router-dom';
import SideNavBar from '@/Components/SideNavBar/SideNavBar';
import LayoutSkeleton from './LayoutSkeleton';

export function Layout() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { mode } = useContext(ThemeContext);

  if (isLoading) {
    return (
      <>
        <LayoutSkeleton></LayoutSkeleton>
      </>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      {isAuthenticated ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <header>
              <SideNavBar children={<Outlet></Outlet>} />
            </header>
          </div>
        </ThemeProvider>
      ) : null}
    </>
  );
}
