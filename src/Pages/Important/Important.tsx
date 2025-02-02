import Header from '@/Components/Header/Header';

import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import importantPhoto from '@/assets/calendario.png';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import { useImportant } from './Hook/useImportant';
import globalStyles from '@/Styles/globals.module.css';
import { Box } from '@mui/material';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';

export default function Important() {
  const { handleSubmit, query, tasksCount } = useImportant();

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title="Important"></Header>

        <main className={globalStyles.pageMain}>
          <Box className={globalStyles.TaskListContainer}>
            <TaskList tasks={query.data?.data?.tasks} />
          </Box>

          {tasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="Wondering where your tasks are?"
              description="Any tasks you didn't complete in My Day last time show up in the suggestions pane."
              photo={importantPhoto}
            ></TodoEmptyHelper>
          )}

          <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
        </main>
      </div>
    </>
  );
}
