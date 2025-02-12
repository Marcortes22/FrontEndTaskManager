import { useAll } from '@/Pages/All/Hook/useAll';
import { Box } from '@mui/material';
import globalStyles from '@/Styles/globals.module.css';
import allImage from '@/assets/pageImagesInformation/allImage.png';
import {
  DespegableTaskList,
  Header,
  TodoEmptyHelper,
  TaskInputForm,
  LinearProgres,
  MainSkeleton,
} from '@/Components/index';

export default function All() {
  const { query, allTasksCount } = useAll();

  if (query.isLoading) {
    return <MainSkeleton />;
  }
  return (
    <>
      <LinearProgres isLoading={query.isFetching} />

      <div className={globalStyles.pageContainer}>
        <Header title="All"></Header>
        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: allTasksCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.map((task) => (
              <DespegableTaskList
                key={task.id}
                tasks={task.taskItems}
                title={task.name}
                count={task.taskItems.length}
                // defaulOpenValue={true}
              ></DespegableTaskList>
            ))}
          </Box>

          {allTasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="All Tasks in One Place"
              description="Access every task in your list, no matter its status."
              photo={allImage}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="allTasks"></TaskInputForm>
      </div>
    </>
  );
}
