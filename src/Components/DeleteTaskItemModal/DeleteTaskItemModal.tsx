import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TaskItemType } from '@/Types/TaskItem.type';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        <Box sx={style}>
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
