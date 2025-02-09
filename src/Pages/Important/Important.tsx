import Header from '@/Components/Header/Header';

import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import importantPhoto from '@/assets/pageImagesInformation/calendario.png';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import { useImportant } from './Hook/useImportant';
import globalStyles from '@/Styles/globals.module.css';
import { Box } from '@mui/material';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';

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
              title="Wondering where your tasks are?"
              description="Any tasks you didn't complete in My Day last time show up in the suggestions pane."
              photo={importantPhoto}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="ImportantTasks"></TaskInputForm>
      </div>
    </>
  );
}
