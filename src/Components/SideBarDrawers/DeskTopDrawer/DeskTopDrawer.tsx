import { IconButton, useTheme } from '@mui/material';
import DrawerStyles from './styles/DrawerStyles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SideBarItems, DrawerHeaderStyles } from '@/Components/index';

export default function DeskTopDrawer({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
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
        <SideBarItems open={open} />
      </DrawerStyles>
    </>
  );
}
