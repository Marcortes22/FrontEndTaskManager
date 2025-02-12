import { SideBarItems } from '@/Components/index';
import { Box, Drawer, useTheme } from '@mui/material';

export default function MobileDrawer({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) {
  const theme = useTheme();

  return (
    <>
      <Drawer open={open} onClose={handleDrawerClose}>
        <Box
          sx={{
            width: 240,
            bgcolor: theme.palette.background.default,
            height: '100%',
          }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <Box sx={{ height: '64px' }}></Box>
          <SideBarItems open={open} />
        </Box>
      </Drawer>
    </>
  );
}
