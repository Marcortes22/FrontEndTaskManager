import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { Anchor } from '@/Types/Types';
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
import { TaskItem } from '@/Types/TaskItem.type';
import { useState } from 'react';
import { Toll } from '@mui/icons-material';
export default function TaskDetail({ task }: { task: TaskItem | null }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [noteIsEditing, setNoteIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(task?.note);

  const [titleIsEditing, setTitleIsEditing] = useState(false);
  const [titleText, setTitleText] = useState(task?.title);

  function handleNoteChange(open: boolean) {
    setNoteIsEditing(open);
  }

  function handleTitleChange(open: boolean) {
    setTitleIsEditing(open);
  }

  function handleTextNoteChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNoteText(e.target.value);
  }

  function handleTextTitleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTitleText(e.target.value);
  }

  const anchor: Anchor = isMobile ? 'bottom' : 'right';

  return (
    <>
      {task && (
        <Box
          className={styles.TaskDetailContainer}
          sx={{
            width: anchor === 'bottom' ? 'auto' : 250,
            height: anchor === 'bottom' ? '75vh' : '100vh',
            marginTop: anchor === 'right' ? '64px' : '0px',
          }}
        >
          <Box
            className={styles.TaskDetailPrincipalContentContainer}
            role="presentation"
          >
            <Box
              sx={{ bgcolor: theme.palette.secondary.main }}
              className={styles.TaskMainInformation}
            >
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
                      fullWidth
                      onBlur={() => handleTitleChange(false)}
                      onChange={(e) => handleTextTitleChange(e)}
                      autoFocus
                      value={titleText}
                      error={(titleText?.trim()?.length ?? 0) === 0}
                      helperText={
                        (titleText?.trim()?.length ?? 0) === 0
                          ? 'Title must be between 1 and 25 characters'
                          : ''
                      }
                    ></TextField>
                  </Tooltip>
                ) : (
                  <Typography
                    className={styles.TaskTitle}
                    onClick={() => setTitleIsEditing(true)}
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
            </Box>

            <Box sx={{ bgcolor: theme.palette.secondary.main }}>
              <Box>
                {task?.addedToMyDay &&
                  (validateTodayTask(task.addedToMyDay) ? (
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
                  ))}
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
            </Box>
            <Box
              sx={{ bgcolor: theme.palette.secondary.main }}
              onClick={() => setNoteIsEditing(true)}
            >
              {noteIsEditing ? (
                <TextField
                  multiline
                  maxRows={4}
                  label="Note"
                  variant="outlined"
                  fullWidth
                  onBlur={() => setNoteIsEditing(false)}
                  onChange={(e) => setNoteText(e.target.value)}
                  autoFocus
                  value={noteText}
                  error={
                    (noteText?.trim()?.length ?? 0) === 0 ||
                    (noteText?.trim()?.length ?? 0) >= 100
                  }
                  helperText={
                    (noteText?.trim()?.length ?? 0) === 0 ||
                    (noteText?.trim()?.length ?? 0) >= 100
                      ? 'Note must be between 1 and 100 characters'
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
            </Box>
          </Box>

          <Box className={styles.TaskDetailSecondaryContentContainer}>
            <p style={{ flexGrow: '1' }}>
              Created on {format(task?.createdDate, 'medium')}
            </p>
            <IconButton sx={{ padding: '0px' }}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}
