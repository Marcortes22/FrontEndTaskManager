import SideBarItems from '@/Components/SideBarItems/SideBarItems';
import { Box, Drawer } from '@mui/material';

export default function MobileDrawer({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) {
  return (
    <>
      <Drawer open={open} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 240 }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <SideBarItems open={open} />
        </Box>
      </Drawer>
    </>
  );
}
