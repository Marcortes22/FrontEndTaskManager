import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBarStyles from '@/Components/SideBarDrawers/DeskTopDrawer/styles/AppBarStyles';
import AppBar from '@/Components/AppBar/AppBar';
import DeskTopDrawer from '@/Components/SideBarDrawers/DeskTopDrawer/DeskTopDrawer';
import { useLayOut } from './Hook/useLayOut';
import MobileDrawer from '@/Components/SideBarDrawers/MobileDrawer/MobileDrawer';

export function Layout() {
  const {
    backgroundImage,
    handleDrawerClose,
    handleDrawerOpen,
    isDeskTop,
    open,
    theme,
  } = useLayOut();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            height: '100dvh',
            display: 'flex',
          }}
        >
          <AppBarStyles position="fixed" open={open} sx={{ height: '64px' }}>
            <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
          </AppBarStyles>

          {isDeskTop ? (
            <DeskTopDrawer open={open} handleDrawerClose={handleDrawerClose} />
          ) : (
            <MobileDrawer open={open} handleDrawerClose={handleDrawerClose} />
          )}

          <Box
            component="main"
            sx={{
              width: '100%',
              marginTop: '64px',
              backgroundImage: `url(${backgroundImage})`,
              backgroundColor: 'black',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingX: '5px',
              color: 'white',
              transition: 'ease-in-out',
              transitionDuration: '0.3s',
              maxHeight: '100dvh',
              overflow: 'hidden',
            }}
          >
            {<Outlet />}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
