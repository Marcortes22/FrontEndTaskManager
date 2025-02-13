import { Box, IconButton, useTheme } from '@mui/material';
import DrawerStyles from './styles/DrawerStyles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SideBarItems, DrawerHeaderStyles } from '@/Components/index';
import styles from './styles/DeskTopDrawer.module.css';

export default function DeskTopDrawer({
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
      <DrawerStyles
        variant="permanent"
        open={open}
        sx={{ bgcolor: theme.palette.background.default }}
        onClose={() => handleDrawerClose()}
      >
        <DrawerHeaderStyles sx={{ height: '64px', minHeight: '64px' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeaderStyles>
        <Box
          className={styles.DesktopDrawerItemsContainer}
          sx={{
            bgcolor: theme.palette.background.default,
            height: '100dvh',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <SideBarItems
            handleCreateTaskListDialogOpen={handleCreateTaskListDialogOpen}
            open={open}
          />
        </Box>
      </DrawerStyles>
    </>
  );
}
