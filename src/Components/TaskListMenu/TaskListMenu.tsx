import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, useTheme } from '@mui/material';
import { useTaskListMenu } from './Hook/useTaskListMenu';
import DeleteTaskListModal from '../Modals/DeleteTaskListModal/DeleteTaskListModal';

export default function TaskListMenu({
  taskListId,
  taskListName,
}: {
  taskListId: number;
  taskListName: string;
}) {
  const {
    open,
    handleClick,
    handleClose,
    anchorEl,
    openDeleteTaskListModal,
    setOpenDeleteTaskListModal,
  } = useTaskListMenu();
  const theme = useTheme();

  return (
    <>
      <IconButton
        sx={{
          zIndex: 2,
          paddingX: '0px',
          width: '20px',
          color: theme.palette.primary.main,
        }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          handleClick(event);
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(event: React.MouseEvent<HTMLLIElement>) => {
          event.stopPropagation();
          handleClose();
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setOpenDeleteTaskListModal(true);
          }}
          sx={{
            color: theme.palette.primary.main,
            display: 'flex',
            gap: '5px',
          }}
        >
          <DeleteSweepIcon sx={{ fontSize: '32px' }} /> Delete
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setOpenDeleteTaskListModal(true);
          }}
          sx={{
            color: theme.palette.primary.main,
            display: 'flex',
            gap: '5px',
          }}
        >
          <EditNoteIcon sx={{ fontSize: '32px' }} /> Update
        </MenuItem>
      </Menu>
      <DeleteTaskListModal
        taskListId={taskListId}
        taskListName={taskListName}
        open={openDeleteTaskListModal}
        setOpen={setOpenDeleteTaskListModal}
      ></DeleteTaskListModal>
    </>
  );
}
