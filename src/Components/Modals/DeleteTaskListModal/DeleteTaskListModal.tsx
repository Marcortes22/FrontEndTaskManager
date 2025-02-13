import { Box, Button, Modal, Typography } from '@mui/material';
import { ModalStyle } from '../styles/ModalStyles';
import { useDeleteTaskListModal } from './Hook/useDeleteTaskListModal';

export default function DeleteTaskListModal({
  taskListId,
  taskListName,
  open,
  setOpen,
}: {
  taskListId: number;
  taskListName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { handleDeleteTaskList } = useDeleteTaskListModal(taskListId);
  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Task List
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`"${taskListName}" will be permanently deleted with all its tasks`}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                gap: '18px',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{ paddingX: '40px' }}
                variant="contained"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleDeleteTaskList();
                  setOpen(false);
                }}
              >
                Delete
              </Button>
              <Button
                sx={{ paddingX: '40px' }}
                variant="contained"
                color="secondary"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
