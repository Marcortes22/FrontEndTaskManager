import Header from '@/Components/Header/Header';
import { useAll } from './Hook/useAll';
import { Box } from '@mui/material';
import DespegableTaskList from '@/DespegableTaskList/DespegableTaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import globalStyles from '@/Styles/globals.module.css';
import calendarPhoto from '@/assets/icons8-completed-64.png';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';
import { allDefaultData } from '@/Constants/newTaskItemDefaultData';
export default function All() {
  const { query, allTasksCount } = useAll();
  console.log(allTasksCount);
  if (query.isLoading) {
    return <MainSkeleton />;
  }
  return (
    <>
      <LinearProgres isLoading={query.isFetching} />

      <div className={globalStyles.pageContainer}>
        <Header title="All"></Header>
        <main className={globalStyles.pageMain}>
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.map((task) => (
              <DespegableTaskList
                key={task.id}
                tasks={task.taskItems}
                title={task.name}
                count={task.taskItems.length}
              ></DespegableTaskList>
            ))}
          </Box>

          {allTasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="aa"
              description="All tasks will show up here."
              photo={calendarPhoto}
            ></TodoEmptyHelper>
          )}
        </main>
        <TaskInputForm
          defaultValuePerPage={allDefaultData}
          pageQueryKey="AllTasks"
        ></TaskInputForm>
      </div>
    </>
  );
}
