import { TaskItemType } from '@/Types/TaskItem.type';
import { Modal, Typography, Button, Box } from '@mui/material';
import { ModalStyle } from '../styles/ModalStyles';

export default function DeleteTaskItemModal({
  task,
  open,
  setOpen,
  handleDeleteTaskItem,
}: {
  task: TaskItemType;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDeleteTaskItem: (task: TaskItemType) => void;
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`"${task.title}" will be permanently deleted`}
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
              onClick={() => {
                handleDeleteTaskItem(task);
                setOpen(false);
              }}
            >
              Delete
            </Button>
            <Button
              sx={{ paddingX: '40px' }}
              variant="contained"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
