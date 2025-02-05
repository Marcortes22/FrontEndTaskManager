import Header from '@/Components/Header/Header';

import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import plannedPhoto from '@/assets/time-and-calendar.png';
import { usePlanned } from './Hook/usePlanned';
import DespegableTaskList from '@/DespegableTaskList/DespegableTaskList';
import { Box } from '@mui/material';
import globalStyles from '@/Styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';
import { plannedDefaultData } from '@/Constants/newTaskItemDefaultData';

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

        <main className={globalStyles.pageMain}>
          <Box className={globalStyles.TaskListContainer}>
            <DespegableTaskList
              tasks={query.data?.data?.earlierTasks}
              title="Ealier"
              count={earlierTasksCount}
            ></DespegableTaskList>

            <DespegableTaskList
              tasks={query.data?.data?.todayTasks}
              title="Today"
              count={todayTasksCount}
            ></DespegableTaskList>

            <DespegableTaskList
              tasks={query.data?.data?.tomorrowTaks}
              title="Tomorrow"
              count={tomorrowTasksCount}
            ></DespegableTaskList>

            <DespegableTaskList
              tasks={query.data?.data?.thisWeekTasks}
              title="This Week"
              count={thisWeekTasksCount}
            ></DespegableTaskList>

            <DespegableTaskList
              tasks={query.data?.data?.laterTasks}
              title="Later"
              count={laterTasksCount}
            ></DespegableTaskList>
          </Box>

          {tasksCount > 0 ? null : (
            <TodoEmptyHelper
              title=""
              description="Tasks with due dates will show up here."
              photo={plannedPhoto}
            ></TodoEmptyHelper>
          )}
        </main>
        <TaskInputForm
          defaultValuePerPage={plannedDefaultData}
          pageQueryKey="PlannedTasks"
        ></TaskInputForm>
      </div>
    </>
  );
}
