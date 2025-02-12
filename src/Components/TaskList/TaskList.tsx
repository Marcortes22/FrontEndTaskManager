import styles from './styles/TaskList.module.css';
import { TaskDetailWrapper, TaskDetail } from '@Components/index';
import useTaskList from './Hook/useTaskList';
import { Box, Checkbox, Typography } from '@mui/material';
import { TaskItemType } from '@/Types/index';

import {
  getDateToLocaleZoneDate,
  isOlder,
  validateTodayTask,
} from '@/Utils/TaskItemsDateFunctions';

import {
  CircleOutlinedIcon,
  CheckCircleOutlineIcon,
  StarOutlineOutlinedIcon,
  CalendarMonthOutlinedIcon,
  SunIcon,
  StarIcon,
  NoteOutlinedIcon,
} from '@Icons/Icons';

export default function TaskList({ tasks }: { tasks: TaskItemType[] }) {
  const {
    DrawerState,
    CurrentTaskId,
    handleSwipeableDrawerState,
    handleTaskClick,
    handleUpdateTaskItem,
    theme,
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
