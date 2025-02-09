import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import styles from './styles/TaskList.module.css';
import SunIcon from '@mui/icons-material/LightMode';
import TaskDetailWrapper from '../TaskDetailWrapper/TaskDetailWrapper';
import useTaskList from './Hook/useTaskList';
import TaskDetail from '../TaskDetail/TaskDetail';
import { Box, Typography, useTheme } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {
  getDateToLocaleZoneDate,
  isOlder,
  validateTodayTask,
} from '@/Utils/TaskItemsDateFunctions';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { TaskItemType } from '@/Types/TaskItem.type';

export default function TaskList({ tasks }: { tasks: TaskItemType[] }) {
  const theme = useTheme();
  const {
    DrawerState,
    CurrentTaskId,
    handleSwipeableDrawerState,
    handleTaskClick,
    handleUpdateTaskItem,
  } = useTaskList();

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
                  onClick={(event) => {
                    event.stopPropagation();
                    handleUpdateTaskItem(task, {
                      isCompleted: !task.isCompleted,
                    });
                  }}
                />
                <Typography className={styles.titleTask}>
                  {task.title}
                </Typography>
              </div>

              <Checkbox
                sx={{ color: 'white' }}
                className={styles.CheckBoxStyle}
                icon={<StarOutlineOutlinedIcon />}
                checkedIcon={<StarIcon />}
                size="medium"
                checked={task.isImportant}
                onClick={(event) => {
                  event.stopPropagation();
                  handleUpdateTaskItem(task, {
                    isImportant: !task.isImportant,
                  });
                }}
              />
            </div>
            <div className={styles.taskTags}>
              {task.addedToMyDay &&
                validateTodayTask(new Date(task.addedToMyDay)) && (
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
                    >
                      {getDateToLocaleZoneDate(task.dueDate, 'medium')}
                    </Typography>
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

        <TaskDetailWrapper
          DrawerState={DrawerState}
          handleSwipeableDrawerState={handleSwipeableDrawerState}
          children={
            <TaskDetail
              DrawerState={DrawerState}
              handleSwipeableDrawerState={handleSwipeableDrawerState}
              taskId={CurrentTaskId}
            ></TaskDetail>
          }
        ></TaskDetailWrapper>
      </div>
    </>
  );
}
