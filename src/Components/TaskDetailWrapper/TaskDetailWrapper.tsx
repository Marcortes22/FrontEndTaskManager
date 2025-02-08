import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useMediaQuery, useTheme } from '@mui/material';
import { ReactElement } from 'react';
import { Anchor } from '@/Types/Types';

export default function TaskDetailWrapper({
  DrawerState,
  handleSwipeableDrawerState,
  children,
}: {
  DrawerState: boolean;
  handleSwipeableDrawerState: (open: boolean) => void;
  children: ReactElement;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const anchor: Anchor = isMobile ? 'bottom' : 'right';

  return (
    <div>
      <SwipeableDrawer
        anchor={anchor}
        open={DrawerState}
        onClose={() => handleSwipeableDrawerState(false)}
        onOpen={() => handleSwipeableDrawerState(true)}
      >
        {children}
      </SwipeableDrawer>
    </div>
  );
}
