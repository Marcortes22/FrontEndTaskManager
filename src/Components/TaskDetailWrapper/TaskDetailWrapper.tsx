import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ReactElement } from 'react';
import { useTaskDetailWrapper } from './Hook/useTaskDetailWrapper';

export default function TaskDetailWrapper({
  DrawerState,
  handleSwipeableDrawerState,
  children,
}: {
  DrawerState: boolean;
  handleSwipeableDrawerState: (open: boolean) => void;
  children: ReactElement;
}) {
  const { anchor } = useTaskDetailWrapper();

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
