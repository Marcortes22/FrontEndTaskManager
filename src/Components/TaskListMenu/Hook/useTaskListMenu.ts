import { useState } from 'react';

export function useTaskListMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDeleteTaskListModal, setOpenDeleteTaskListModal] = useState(false);
  const [openUpdateTaskListDialog, setOpenUpdateTaskListDialog] =
    useState(false);

  const handleUpdateTaskListDialogClose = () => {
    setOpenUpdateTaskListDialog(false);
  };

  const handleUpdateTaskListDialogOpen = () => {
    setOpenUpdateTaskListDialog(true);
    handleClose();
  };
  const handleDeleteTaskListModaloOpen = () => {
    setOpenDeleteTaskListModal(true);
    handleClose();
  };

  return {
    open,
    handleClick,
    handleClose,
    anchorEl,
    openDeleteTaskListModal,
    setOpenDeleteTaskListModal,
    openUpdateTaskListDialog,
    handleUpdateTaskListDialogClose,
    handleUpdateTaskListDialogOpen,
    handleDeleteTaskListModaloOpen,
  };
}
