import { Box, Button, Checkbox, IconButton, TextField } from '@mui/material';
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
import { TaskItem } from '@/Types/Task.type';
export default function TaskDetail({ task }: { task: TaskItem | null }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            <Box className={styles.TaskMainInformation}>
              <Box className={styles.TaskTitleContainer}>
                <Checkbox
                  className={styles.CheckBoxStyle}
                  icon={<CircleOutlinedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  checked={task?.isCompleted ?? false}
                />
                <p className={styles.TaskTitle}>{task?.title}</p>
              </Box>
              <Box className={styles.StarCheckBoxContainer}>
                <Checkbox
                  className={styles.CheckBoxStyle}
                  icon={<StarOutlineOutlinedIcon />}
                  checkedIcon={<StarIcon />}
                  checked={task?.isImportant ?? false}
                />
              </Box>
            </Box>
            <Box>
              {validateTodayTask(task) ? (
                <Button disabled={true} startIcon={<WbSunnyIcon></WbSunnyIcon>}>
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
                  disabled={true}
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
            <Box>
              <TextField
                multiline
                maxRows={4}
                label="Add note"
                variant="standard"
                fullWidth
              ></TextField>
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
