import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useDrawer from './Hook/useSideNavBar';
import AppBar from './Components/AppBar';
import DrawerHeader from './Components/DrawerHeader';
import Drawer from './Components/Drawer';
import SideBar from './Components/Sidebar/Sidebar';
import DrawerItems from './Components/SideBarItems/SideBarItems';

import { useContext } from 'react';
import ThemeContext from '@/Contexts/ThemeContext';

export default function SideNavBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const { open, handleDrawerOpen, handleDrawerClose } = useDrawer();
  const { backgroundImage } = useContext(ThemeContext);

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        // sx={{ bgcolor: theme.palette.background.default }}
      >
        <SideBar open={open} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <DrawerItems open={open} />
      </Drawer>
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
          padding: '5px',
          color: 'white',
          transition: 'ease-in-out',
          transitionDuration: '0.3s',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
