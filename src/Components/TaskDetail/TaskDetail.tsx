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

export default function TaskDetail({
  taskId,
  DrawerState,
}: {
  taskId?: number;
  DrawerState: boolean;
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
    handleClose,
    handleClick,
    handleUpdateTaskItemDetail,
    handleDateChange,
  } = useTaskDetail(taskId ?? 0, DrawerState);

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
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <DateCalendar
                    value={task?.dueDate ? dayjs(task.dueDate) : null}
                    onChange={(newValue) => {
                      handleClose();
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
                  autoFocus
                  value={noteText ?? ''}
                  // error={(noteText?.trim()?.length ?? 0) === 0}
                  // helperText={
                  //   (noteText?.trim()?.length ?? 0) === 0
                  //     ? 'Note must be at least one character'
                  //     : ''
                  // }
                ></TextField>
              ) : (
                <Tooltip title="Click to edit" arrow>
                  <Typography
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
            <IconButton sx={{ padding: '0px' }}>
              <DeleteOutlineOutlinedIcon
                sx={{
                  color: theme.palette.error.dark,
                  fontSize: theme.typography.h5.fontSize,
                }}
              />
            </IconButton>
          </Paper>
        </Paper>
      )}
    </>
  );
}
