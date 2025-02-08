import { useState } from 'react';

export function useDeskTopDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleDrawerOpen,
    handleDrawerClose,
  };
}
