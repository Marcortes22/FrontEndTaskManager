import styles from './styles/Completed.module.css';
import Header from '@/Components/Header/Header';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import completedPhoto from '@/assets/icons8-completed-64.png';
import { useCompleted } from './Hook/useCompleted';
import { Box } from '@mui/material';
import DespegableTaskList from '@/DespegableTaskList/DespegableTaskList';
import globalStyles from '@/styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
export default function Completed() {
  const { handleSubmit, query, completedTasksCount } = useCompleted();

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title="Completed"></Header>

        <main className={globalStyles.pageMain}>
          <Box className={styles.TaskListContainer}>
            {query.data?.data?.map((task) => (
              <DespegableTaskList
                key={task.id}
                tasks={task.taskItems}
                title={task.name}
                count={task.taskItems.length}
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

          <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
        </main>
      </div>
    </>
  );
}
