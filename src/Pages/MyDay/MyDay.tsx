import { format } from '@formkit/tempo';
import calendarPhoto from '@/assets/calendar.png';
import Header from '@/Components/Header/Header';
import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import DespegableTaskList from '@/DespegableTaskList/DespegableTaskList';
import { Box } from '@mui/material';
import useMyDay from './Hook/useMyDay';
import globalStyles from '@/styles/globals.module.css';
import LinearProgres from '@/Components/LinearProgres/LinearProgres';
import MainSkeleton from '@/Components/Skeletons/MainSkeleton/MainSkeleton';

export default function MyDay() {
  const { todayDate, query, tasksCount } = useMyDay();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  console.log('Zona horaria del usuario:', timeZone);

  if (query.isLoading) {
    return <MainSkeleton />;
  }

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div className={globalStyles.pageContainer}>
        <Header
          title="My Day"
          children={
            <p>{format({ date: todayDate, format: 'full', tz: timeZone })}</p>
          }
        ></Header>

        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: tasksCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            <TaskList tasks={query.data?.data?.uncompletedTasks} />

            <DespegableTaskList
              tasks={query.data?.data?.completedTasks}
              title="Completed"
              count={query.data?.data?.completedCount}
            ></DespegableTaskList>
          </Box>

          {tasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="Focus on your day"
              description="Get things done with My Day. A list that refreshes every day."
              photo={calendarPhoto}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="MyDayTasks"></TaskInputForm>
      </div>
    </>
  );
}
