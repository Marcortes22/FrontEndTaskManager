import Header from '@/Components/Header/Header';

import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import plannedPhoto from '@/assets/pageImagesInformation/time-and-calendar.png';
import { usePlanned } from './Hook/usePlanned';
import DespegableTaskList from '@/Components/DespegableTaskList/DespegableTaskList';
import { Box } from '@mui/material';
import globalStyles from '@/Styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';

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
              title=""
              description="Tasks with due dates will show up here."
              photo={plannedPhoto}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="PlannedTasks"></TaskInputForm>
      </div>
    </>
  );
}
