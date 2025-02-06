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

import { Box, Typography, useTheme } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { isOlder, validateTodayTask } from '@/Utils/Funtions';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { TaskItemType } from '@/Types/TaskItem.type';
import { useTaskItemMutation } from '@/Common/Mutations/useTaskItemMutation';
import { useAuth0 } from '@auth0/auth0-react';

import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { useLocation } from 'react-router-dom';

export default function TaskList({ tasks }: { tasks?: TaskItemType[] }) {
  const {
    DrawerState,
    CurrentTask,
    handleSwipeableDrawerState,
    handleTaskClick,
  } = useTaskList();
  const theme = useTheme();
  const location = useLocation();
  const { updateOnSubmit } = useTaskItemMutation(location.pathname);
  const { getAccessTokenSilently } = useAuth0();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handle = async (task: TaskItemType) => {
    const token = await getAccessTokenSilently();
    const newTask: ICreateTaskItem = {
      ...task,
      isCompleted: !task.isCompleted,
    };

    updateOnSubmit({
      taskItemId: task.id,
      token,
      taskItem: newTask,
    });
  };

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
                    handle(task);
                  }}
                />
                <p className={styles.titleTask}>{task.title}</p>
              </div>

              <Checkbox
                className={styles.CheckBoxStyle}
                icon={<StarOutlineOutlinedIcon />}
                checkedIcon={<StarIcon />}
                size="medium"
                checked={task.isImportant}
                onClick={(event) => {
                  event.stopPropagation();
                  handle(task);
                }}
              />
            </div>
            <div className={styles.taskTags}>
              {validateTodayTask(task.addedToMyDay) && (
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
                    >{`${format({
                      date: task.dueDate,
                      format: 'medium',
                      tz: timeZone,
                    })}`}</Typography>
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
