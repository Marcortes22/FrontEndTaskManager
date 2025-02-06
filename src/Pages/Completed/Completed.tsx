import Header from '@/Components/Header/Header';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import completedPhoto from '@/assets/icons8-completed-64.png';
import { useCompleted } from './Hook/useCompleted';
import { Box } from '@mui/material';
import DespegableTaskList from '@/DespegableTaskList/DespegableTaskList';
import globalStyles from '@/styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';
export default function Completed() {
  const { query, completedTasksCount } = useCompleted();

  if (query.isLoading) {
    return <MainSkeleton />;
  }
  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title="Completed"></Header>

        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: completedTasksCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.map((task) => (
              <DespegableTaskList
                key={task.id}
                tasks={task.taskItems}
                title={task.name}
                count={task.taskItems.length}
                defaulOpenValue={true}
              ></DespegableTaskList>
            ))}
          </Box>

          {completedTasksCount > 0 ? null : (
            <TodoEmptyHelper
              title=""
              description="Tasks with due dates will show up here."
              photo={completedPhoto}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="CompletedTasks"></TaskInputForm>
      </div>
    </>
  );
}
