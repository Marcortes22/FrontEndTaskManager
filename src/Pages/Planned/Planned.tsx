import plannedImage from '@/assets/pageImagesInformation/plannedImage.png';
import { usePlanned } from './Hook/usePlanned';
import globalStyles from '@/Styles/globals.module.css';
import { Box } from '@mui/material';

import {
  DespegableTaskList,
  Header,
  TaskInputForm,
  TodoEmptyHelper,
  LinearProgres,
  MainSkeleton,
} from '@/Components/index';

export default function Planned() {
  const {
    query,
    earlierTasksCount,
    todayTasksCount,
    tomorrowTasksCount,
    thisWeekTasksCount,
    laterTasksCount,
    tasksCount,
  } = usePlanned();

  if (query.isLoading) {
    return <MainSkeleton />;
  }

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header title="Planned"></Header>

        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: tasksCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.earlierTasks && (
              <DespegableTaskList
                tasks={query.data?.data?.earlierTasks}
                title="Ealier"
                count={earlierTasksCount}
                // defaulOpenValue={true}
              ></DespegableTaskList>
            )}

            {query.data?.data?.todayTasks && (
              <DespegableTaskList
                tasks={query.data?.data?.todayTasks}
                title="Today"
                count={todayTasksCount}
              ></DespegableTaskList>
            )}

            {query.data?.data?.tomorrowTaks && (
              <DespegableTaskList
                tasks={query.data?.data?.tomorrowTaks}
                title="Tomorrow"
                count={tomorrowTasksCount}
              ></DespegableTaskList>
            )}

            {query.data?.data?.thisWeekTasks && (
              <DespegableTaskList
                tasks={query.data?.data?.thisWeekTasks}
                title="Next 7 days"
                count={thisWeekTasksCount}
              ></DespegableTaskList>
            )}

            {query.data?.data?.laterTasks && (
              <DespegableTaskList
                tasks={query.data?.data?.laterTasks}
                title="Later"
                count={laterTasksCount}
              ></DespegableTaskList>
            )}
          </Box>

          {tasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="Stay on Track"
              description="See what's ahead. Keep track of tasks planned for the future."
              photo={plannedImage}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="PlannedTasks"></TaskInputForm>
      </div>
    </>
  );
}
