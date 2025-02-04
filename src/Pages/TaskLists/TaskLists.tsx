import Header from '@/Components/Header/Header';
import { Box } from '@mui/material';
import DespegableTaskList from '@/DespegableTaskList/DespegableTaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import { useTaskLists } from './Hook/useTaskLists';
import plannedPhoto from '@/assets/time-and-calendar.png';
import TaskList from '@/Components/TaskList/TaskList';
import globalStyles from '@/Styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';

export default function TaskLists() {
  const { handleSubmit, query, completedTaskCount, allTaskCount } =
    useTaskLists();

  if (query.isLoading) {
    return <MainSkeleton />;
  }

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title={query.data?.data?.name || 'Default Title'}></Header>

        <main className={globalStyles.pageMain}>
          <Box className={globalStyles.TaskListContainer}>
            <TaskList tasks={query.data?.data?.uncompletedTasks}></TaskList>
            <DespegableTaskList
              tasks={query.data?.data?.completedTasks}
              title="Completed"
              count={completedTaskCount}
            ></DespegableTaskList>
          </Box>

          {allTaskCount > 0 ? null : (
            <TodoEmptyHelper
              title=""
              description="Tasks created on this llist will show up here."
              photo={plannedPhoto}
            ></TodoEmptyHelper>
          )}

          <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
        </main>
      </div>
    </>
  );
}
