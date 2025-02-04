import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import styles from './styles/TaskList.module.css';
import { format } from '@formkit/tempo';
import SunIcon from '@mui/icons-material/LightMode';
import SwipeableTemporaryDrawer from '../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer';
import useTaskList from './Hook/useTaskList';
import TaskDetail from '../TaskDetail/TaskDetail';
import { TaskItem } from '@/Types/TaskItem.type';
import { Box, Typography, useTheme } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { isOlder, validateTodayTask } from '@/Utils/Funtions';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
export default function TaskList({ tasks }: { tasks?: TaskItem[] }) {
  const {
    DrawerState,
    CurrentTask,
    handleSwipeableDrawerState,
    handleTaskClick,
  } = useTaskList();
  const theme = useTheme();

  return (
    <>
      <div className={styles.TaskListContainer}>
        {tasks?.map((task, index) => (
          <div
            onClick={() => {
              handleSwipeableDrawerState(true);
              handleTaskClick(task);
            }}
            className={styles.Task}
            key={index}
          >
            <div className={styles.TaskActions}>
              <div className={styles.taskTitleContariner}>
                <Checkbox
                  className={styles.CheckBoxStyle}
                  icon={<CircleOutlinedIcon sx={{ color: 'white' }} />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  size="medium"
                  checked={task.isCompleted}
                  onClick={(event) => event.stopPropagation()}
                />
                <p className={styles.titleTask}>{task.title}</p>
              </div>

              <Checkbox
                className={styles.CheckBoxStyle}
                icon={<StarOutlineOutlinedIcon />}
                checkedIcon={<StarIcon />}
                size="medium"
                checked={task.isImportant}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
            <div className={styles.taskTags}>
              {task?.addedToMyDay && validateTodayTask(task.addedToMyDay) && (
                <>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <SunIcon sx={{ fontSize: '16px' }} />
                    <Typography sx={{ userSelect: 'none' }} variant="caption">
                      My Day
                    </Typography>
                  </Box>

                  <Typography
                    sx={{ userSelect: 'none' }}
                    fontWeight="bold"
                    variant="caption"
                  >{`·`}</Typography>
                </>
              )}

              <Typography
                sx={{ userSelect: 'none' }}
                variant="caption"
              >{`Tasks`}</Typography>

              {task.dueDate && (
                <>
                  <Typography
                    sx={{ userSelect: 'none' }}
                    fontWeight="bold"
                    variant="caption"
                  >{`·`}</Typography>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <CalendarMonthOutlinedIcon
                      sx={{
                        fontSize: '16px',
                        color: isOlder(task.dueDate)
                          ? theme.palette.error.main
                          : 'inherit',
                      }}
                    />
                    <Typography
                      sx={{
                        userSelect: 'none',
                        color: isOlder(task.dueDate)
                          ? theme.palette.error.main
                          : 'inherit',
                      }}
                      variant="caption"
                    >{`${format(task.dueDate, 'medium')}`}</Typography>
                  </Box>
                </>
              )}

              {task?.note && (
                <>
                  <Typography
                    sx={{ userSelect: 'none' }}
                    fontWeight="bold"
                    variant="caption"
                  >{`·`}</Typography>
                  <NoteOutlinedIcon
                    sx={{
                      fontSize: '16px',
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}

        <SwipeableTemporaryDrawer
          DrawerState={DrawerState}
          handleSwipeableDrawerState={handleSwipeableDrawerState}
          children={<TaskDetail task={CurrentTask}></TaskDetail>}
        ></SwipeableTemporaryDrawer>
      </div>
    </>
  );
}
