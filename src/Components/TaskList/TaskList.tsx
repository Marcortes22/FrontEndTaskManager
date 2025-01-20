import { Task } from '@/Types/Task.type';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import styles from './styles/TaskList.module.css';

import SwipeableTemporaryDrawer from '../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer';
import useTaskList from './Hook/useTaskList';
import TaskDetail from '../TaskDetail/TaskDetail';

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const {
    DrawerState,
    CurrentTask,
    handleSwipeableDrawerState,
    handleTaskClick,
  } = useTaskList();

  return (
    <>
      <div className={styles.TaskListContainer}>
        {tasks.map((task, index) => (
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
                  icon={<CircleOutlinedIcon />}
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
              {task.tags?.map((tag, index) => (
                <p key={index}>{tag.name}</p>
              ))}
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
