import useDespegableTaskList from './Hook/useDespegableTaskList';
import { Badge, Box, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from './styles/DespegableTaskList.module.css';
import { TaskItemType } from '@Types/index';
import { TaskList } from '@/Components/index';

export default function DespegableTaskList({
  tasks,
  title,
  count,
  defaulOpenValue,
}: {
  tasks: TaskItemType[];
  title?: string;
  count?: number;
  defaulOpenValue?: boolean;
}) {
  const { open, handleOpen } = useDespegableTaskList(defaulOpenValue);

  return (
    <>
      {tasks && tasks.length > 0 && (
        <Box sx={{ paddingTop: '10px' }}>
          <Badge badgeContent={count} color="secondary">
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
              {/* <p> {count}</p> */}
            </Box>
          </Badge>

          {open && (tasks?.length ?? 0) > 0 && <TaskList tasks={tasks} />}
        </Box>
      )}
    </>
  );
}
