import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { format } from '@formkit/tempo';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from './styles/TaskDetail.module.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { validateTodayTask } from '@/Utils/Funtions';
import { TaskItemType } from '@/Types/TaskItem.type';
import { useTaskDetail } from './Hook/useTaskDetail';

export default function TaskDetail({ task }: { task: TaskItemType | null }) {
  const {
    noteIsEditing,
    noteText,
    titleIsEditing,
    titleText,
    handleTitleChange,
    handleTitleTextChange,
    handleNoteChange,
    handleTextNoteChange,
    theme,
  } = useTaskDetail(task);

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
                  checked={task?.isCompleted ?? false}
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
                />
              </Box>

              <Box className={styles.StarCheckBoxContainer}></Box>
            </Paper>

            <Paper elevation={3}>
              <Box>
                {validateTodayTask(task?.addedToMyDay) ? (
                  <Button
                    disabled={validateTodayTask(task.addedToMyDay)}
                    startIcon={<WbSunnyIcon></WbSunnyIcon>}
                  >
                    Added to my day
                  </Button>
                ) : (
                  <Button startIcon={<WbSunnyIcon></WbSunnyIcon>}>
                    Add to my day
                  </Button>
                )}
              </Box>
              <Box>
                {task?.dueDate ? (
                  <Button
                    startIcon={
                      <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
                    }
                  >
                    Due {format(task?.dueDate, 'medium')}
                  </Button>
                ) : (
                  <Button
                    startIcon={
                      <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
                    }
                  >
                    Add due date
                  </Button>
                )}
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
                  error={(noteText?.trim()?.length ?? 0) === 0}
                  helperText={
                    (noteText?.trim()?.length ?? 0) === 0
                      ? 'Note must be at least one character'
                      : ''
                  }
                ></TextField>
              ) : (
                <Tooltip title="Click to edit" arrow>
                  <Typography
                    sx={{
                      width: '100%',
                      paddingX: '16.5px',
                      paddingY: ' 14px',
                      borderRadius: '4px',
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
