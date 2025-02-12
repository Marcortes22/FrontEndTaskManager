import Header from '@/Components/Header/Header';
import { Box } from '@mui/material';
import DespegableTaskList from '@/Components/DespegableTaskList/DespegableTaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import { useTaskLists } from './Hook/useTaskLists';
import taskListImage from '@/assets/pageImagesInformation/taskListImage.png';
import TaskList from '@/Components/TaskList/TaskList';
import globalStyles from '@/Styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';

export default function TaskLists() {
  const { query, completedTaskCount, allTaskCount, taskListId } =
    useTaskLists();

  if (query.isLoading) {
    return <MainSkeleton />;
  }

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title={query.data?.data?.name || 'Default Title'}></Header>

        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: allTaskCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.uncompletedTasks && (
              <TaskList tasks={query.data?.data?.uncompletedTasks}></TaskList>
            )}

            {query.data?.data?.completedTasks && (
              <DespegableTaskList
                tasks={query.data?.data?.completedTasks}
                title="Completed"
                count={completedTaskCount}
              ></DespegableTaskList>
            )}
          </Box>

          {allTaskCount > 0 ? null : (
            <TodoEmptyHelper
              title="Custom Task List"
              description="Your personalized task list. A place to manage specific tasks and projects."
              photo={taskListImage}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm
          defaultTaskListId={Number(taskListId)}
          pageQueryKey="TaskList"
        ></TaskInputForm>
      </div>
    </>
  );
}
