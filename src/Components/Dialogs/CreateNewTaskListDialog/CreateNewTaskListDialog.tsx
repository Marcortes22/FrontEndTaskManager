import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCreateNewTaskListDialog } from './Hook/useCreateNewTaskListDialog';

export default function CreateNewTaskListDialog({
  createTaskListDialogOpen,
  handleCreateTaskListDialogClose,
}: {
  createTaskListDialogOpen: boolean;
  handleCreateTaskListDialogClose: () => void;
}) {
  const { handleSubmit } = useCreateNewTaskListDialog(
    handleCreateTaskListDialogClose,
  );

  return (
    <>
      <Dialog
        open={createTaskListDialogOpen}
        sx={{ width: '100%', height: '100%' }}
        onClose={handleCreateTaskListDialogClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle>New Task List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new taskList name to create it.
          </DialogContentText>
          <TextField
            required
            slotProps={{
              htmlInput: {
                maxLength: 20,
              },
            }}
            margin="dense"
            id="name"
            name="taskListName"
            label="TaskList Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateTaskListDialogClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
