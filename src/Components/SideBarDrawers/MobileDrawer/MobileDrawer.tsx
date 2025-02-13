import { SideBarItems } from '@/Components/index';
import { Box, Drawer, useTheme } from '@mui/material';
import styles from './styles/MobileDrawer.module.css';

export default function MobileDrawer({
  open,
  handleDrawerClose,
  handleCreateTaskListDialogOpen,
}: {
  open: boolean;
  handleDrawerClose: () => void;
  handleCreateTaskListDialogOpen: () => void;
}) {
  const theme = useTheme();

  return (
    <>
      <Drawer open={open} onClose={handleDrawerClose}>
        <Box
          className={styles.MobileDrawerItemsContainer}
          sx={{
            width: 240,
            bgcolor: theme.palette.background.default,
            height: '100dvh',
            overflowY: 'scroll',
          }}
          role="presentation"
        >
          <Box sx={{ height: '64px' }}></Box>
          <SideBarItems
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleCreateTaskListDialogOpen={handleCreateTaskListDialogOpen}
          />
        </Box>
      </Drawer>
    </>
  );
}
