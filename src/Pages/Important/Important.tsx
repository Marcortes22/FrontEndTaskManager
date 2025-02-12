import importantImage from '@/assets/pageImagesInformation/importantImage.png';
import { useImportant } from './Hook/useImportant';
import globalStyles from '@/Styles/globals.module.css';
import { Box } from '@mui/material';

import {
  TodoEmptyHelper,
  TaskInputForm,
  Header,
  TaskList,
  LinearProgres,
  MainSkeleton,
} from '@/Components/index';

export default function Important() {
  const { query, tasksCount } = useImportant();

  if (query.isLoading) {
    return <MainSkeleton />;
  }
  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title="Important"></Header>

        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: tasksCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.tasks && (
              <TaskList tasks={query.data?.data?.tasks} />
            )}
          </Box>

          {tasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="Prioritize What Matters"
              description=" Stay on top of your most important tasks with this focused list."
              photo={importantImage}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="ImportantTasks"></TaskInputForm>
      </div>
    </>
  );
}
