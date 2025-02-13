import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useLayOut } from './Hook/useLayOut';
import {
  BackDrop,
  MobileDrawer,
  DeskTopDrawer,
  AppBar,
  AppBarStyles,
} from '@/Components/index';
import CreateNewTaskListDialog from '@/Components/Dialogs/CreateNewTaskListDialog/CreateNewTaskListDialog';

export function Layout() {
  const {
    backgroundImage,
    handleDrawerClose,
    handleDrawerOpen,
    isDeskTop,
    open,
    theme,
    backgroundIsChanging,
    createTaskListDialogOpen,
    handleCreateTaskListDialogClose,
    handleCreateTaskListDialogOpen,
  } = useLayOut();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CreateNewTaskListDialog
          createTaskListDialogOpen={createTaskListDialogOpen}
          handleCreateTaskListDialogClose={handleCreateTaskListDialogClose}
        />
        <BackDrop />

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
            <DeskTopDrawer
              handleCreateTaskListDialogOpen={handleCreateTaskListDialogOpen}
              open={open}
              handleDrawerClose={handleDrawerClose}
            />
          ) : (
            <MobileDrawer
              open={open}
              handleDrawerClose={handleDrawerClose}
              handleCreateTaskListDialogOpen={handleCreateTaskListDialogOpen}
            />
          )}

          <Box
            component="main"
            sx={{
              width: '100%',
              marginTop: '64px',
              opacity: backgroundIsChanging ? 0 : 1,
              transition: 'opacity 300ms ease-in-out',
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
