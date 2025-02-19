import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useUpdateTaskListDialog } from './Hook/useUpdateTaskListDialog';

export function UpdateTaskListDialog({
  taskListId,
  TaskListName,
  openUpdateTaskListDialog,
  handleUpdateTaskListDialogClose,
}: {
  taskListId: number;
  TaskListName: string;
  openUpdateTaskListDialog: boolean;
  handleUpdateTaskListDialogClose: () => void;
}) {
  const { handleSubmit } = useUpdateTaskListDialog(taskListId);

  return (
    <>
      {openUpdateTaskListDialog && (
        <Dialog
          onClick={(event) => {
            event.stopPropagation();
          }}
          open={openUpdateTaskListDialog}
          sx={{ width: '100%', height: '100%' }}
          onClose={handleUpdateTaskListDialogClose}
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                handleUpdateTaskListDialogClose();
                handleSubmit(event);
              },
            },
          }}
        >
          <DialogTitle>Update Task List name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {` Enter the new name for. "${TaskListName}"`}
            </DialogContentText>
            <TextField
              required
              slotProps={{
                htmlInput: {
                  maxLength: 15,
                },
              }}
              defaultValue={TaskListName}
              margin="dense"
              id="name"
              name="taskListName"
              label="New Name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateTaskListDialogClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
