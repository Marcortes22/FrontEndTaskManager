import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Menu,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { format } from '@formkit/tempo';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from './styles/TaskDetail.module.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { validateTodayTask } from '@/Utils/TaskItemsDateFunctions';
import { useTaskDetail } from './Hook/useTaskDetail';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import DeleteTaskItemModal from '../DeleteTaskItemModal/DeleteTaskItemModal';

export default function TaskDetail({
  taskId,
  DrawerState,
  handleSwipeableDrawerState,
}: {
  taskId?: number;
  DrawerState: boolean;
  handleSwipeableDrawerState: (open: boolean) => void;
}) {
  const theme = useTheme();
  const {
    noteIsEditing,
    noteText,
    titleIsEditing,
    titleText,
    handleTitleChange,
    handleTitleTextChange,
    handleNoteChange,
    handleTextNoteChange,
    task,
    query,
    anchorEl,
    open,
    handleCloseDateSelector,
    handleClick,
    handleUpdateTaskItemDetail,
    handleDateChange,
    handleDeleteTaskItem,
    openDeleteModal,
    setOpenDeleteModal,
  } = useTaskDetail(taskId ?? 0, DrawerState, handleSwipeableDrawerState);

  if (query.isFetching) {
    return (
      <Paper
        elevation={1}
        className={styles.TaskDetailContainer}
        sx={{
          width: { sm: 'auto', md: 250 },
          height: { xs: '75dvh', md: '100vh' },
          marginTop: { xs: '0px', md: '64px' },
        }}
      />
    );
  }

  return (
    <>
      {task && (
        <Paper
          elevation={1}
          className={styles.TaskDetailContainer}
          sx={{
            width: { sm: 'auto', md: 250 },
            height: { xs: '75dvh', md: '100vh' },
            marginTop: { xs: '0px', md: '64px' },
          }}
        >
          <Paper
            elevation={2}
            className={styles.TaskDetailPrincipalContentContainer}
            role="presentation"
          >
            <Paper elevation={3} className={styles.TaskMainInformation}>
              <Box className={styles.TaskTitleContainer}>
                <Checkbox
                  className={styles.CheckBoxStyle}
                  icon={<CircleOutlinedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  checked={task.isCompleted ?? false}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleUpdateTaskItemDetail(task, {
                      isCompleted: !task.isCompleted,
                    });
                  }}
                />

                {titleIsEditing ? (
                  <Tooltip title="Click to edit" arrow>
                    <TextField
                      variant="standard"
                      fullWidth={true}
                      multiline
                      onBlur={() => handleTitleChange(false)}
                      onChange={(e) => handleTitleTextChange(e)}
                      autoFocus
                      onFocus={(e) => {
                        const length = e.target.value.length;
                        e.target.setSelectionRange(length, length);
                      }}
                      value={titleText ?? ''}
                      error={(titleText?.trim()?.length ?? 0) === 0}
                      helperText={
                        (titleText?.trim()?.length ?? 0) === 0
                          ? 'Title must be at least one character'
                          : ''
                      }
                    ></TextField>
                  </Tooltip>
                ) : (
                  <Typography
                    className={styles.TaskTitle}
                    onClick={() => handleTitleChange(true)}
                  >
                    {task?.title}
                  </Typography>
                )}

                <Checkbox
                  className={styles.CheckBoxStyle}
                  icon={<StarOutlineOutlinedIcon />}
                  checkedIcon={<StarIcon />}
                  checked={task?.isImportant ?? false}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleUpdateTaskItemDetail(task, {
                      isImportant: !task.isImportant,
                    });
                  }}
                />
              </Box>

              <Box className={styles.StarCheckBoxContainer}></Box>
            </Paper>

            <Paper elevation={3}>
              <Box>
                {validateTodayTask(task?.addedToMyDay) ? (
                  <Button
                    disabled={true}
                    startIcon={<WbSunnyIcon></WbSunnyIcon>}
                  >
                    <Typography variant="body1">Added to my day</Typography>
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleUpdateTaskItemDetail(task, {
                        addedToMyDay: new Date(),
                      })
                    }
                    startIcon={<WbSunnyIcon></WbSunnyIcon>}
                  >
                    <Typography variant="body1">Add to my day</Typography>
                  </Button>
                )}
              </Box>
              <Box>
                <Button
                  aria-controls={open ? 'dateSelector' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  startIcon={
                    <CalendarMonthOutlinedIcon sx={{ fontSize: '20px' }} />
                  }
                >
                  <Typography variant="body1">
                    {task && dayjs(task.dueDate).isValid()
                      ? `Due: ${dayjs(task.dueDate).format('D/M/YYYY')}`
                      : 'Add due date'}
                  </Typography>
                </Button>

                <Menu
                  id="dateSelector"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseDateSelector}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <DateCalendar
                    value={task?.dueDate ? dayjs(task.dueDate) : null}
                    onChange={(newValue) => {
                      handleCloseDateSelector();
                      handleDateChange(newValue, task);
                    }}
                  />
                </Menu>
              </Box>
            </Paper>
            <Paper elevation={3} onClick={() => handleNoteChange(true)}>
              {noteIsEditing ? (
                <TextField
                  multiline
                  maxRows={4}
                  label="Note"
                  variant="outlined"
                  fullWidth
                  onBlur={() => handleNoteChange(false)}
                  onChange={(e) => handleTextNoteChange(e)}
                  value={noteText ?? ''}
                  autoFocus
                  onFocus={(e) => {
                    const length = e.target.value.length;
                    e.target.setSelectionRange(length, length);
                  }}
                ></TextField>
              ) : (
                <Tooltip title="Click to edit" arrow>
                  <Typography
                    className={styles.TextNoteText}
                    variant="body1"
                    sx={{
                      paddingX: '8px',
                      paddingY: ' 6px',
                      borderRadius: '4px',
                      maxWidth: '90%',
                      textWrap: 'wrap',
                    }}
                  >
                    Note: {task?.note}
                  </Typography>
                </Tooltip>
              )}
            </Paper>
          </Paper>

          <Paper
            elevation={3}
            className={styles.TaskDetailSecondaryContentContainer}
          >
            <p style={{ flexGrow: '1' }}>
              Created on {format(task?.createdDate, 'medium')}
            </p>
            <IconButton
              sx={{ padding: '0px' }}
              onClick={() => setOpenDeleteModal(true)}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  color: theme.palette.error.dark,
                  fontSize: theme.typography.h5.fontSize,
                }}
              />
            </IconButton>
          </Paper>
          <DeleteTaskItemModal
            task={task}
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            handleDeleteTaskItem={handleDeleteTaskItem}
          ></DeleteTaskItemModal>
        </Paper>
      )}
    </>
  );
}
