import useDespegableTaskList from './useDespegableTaskList';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from './styles/DespegableTaskList.module.css';
import TaskList from '@/Components/TaskList/TaskList';
import { TaskItem } from '@/Types/Task.type';

export default function DespegableTaskList({
  tasks,
  title,
  count,
}: {
  tasks?: TaskItem[];
  title?: string;
  count?: number;
}) {
  const { open, handleOpen } = useDespegableTaskList();

  return (
    <>
      {tasks && tasks.length > 0 && (
        <Box>
          <Box className={styles.DespegableTaskListContainer}>
            <IconButton
              sx={{ padding: 0 }}
              aria-label="Mode"
              onClick={handleOpen}
            >
              <KeyboardArrowRightIcon
                sx={{ color: 'white' }}
                className={
                  open
                    ? styles.RotateRightIcon
                    : styles.RotateInitialPositionIcon
                }
              />
            </IconButton>

            <p> {title}</p>
            <p> {count}</p>
          </Box>

          {open && (tasks?.length ?? 0) > 0 && <TaskList tasks={tasks} />}
        </Box>
      )}
    </>
  );
}
