import { getDateToLocaleZoneDate } from '@/Utils/TaskItemsDateFunctions';
import globalStyles from '@/Styles/globals.module.css';
import useMyDay from './Hook/useMyDay';
import { Box } from '@mui/material';
import myDayImage from '@/assets/pageImagesInformation/myDayImage.webp';
import {
  Header,
  TaskList,
  TodoEmptyHelper,
  TaskInputForm,
  DespegableTaskList,
  LinearProgres,
  MainSkeleton,
} from '@/Components/index';

export default function MyDay() {
  const { todayDate, query, tasksCount } = useMyDay();

  if (query.isLoading) {
    return <MainSkeleton />;
  }

  return (
    <>
      <LinearProgres isLoading={query.isFetching} />
      <div></div>
      <div className={globalStyles.pageContainer}>
        <Header
          title="My Day"
          children={<p>{getDateToLocaleZoneDate(todayDate, 'full')}</p>}
        ></Header>

        <Box
          className={globalStyles.pageMain}
          sx={{
            justifyContent: tasksCount === 0 ? 'center' : 'start',
          }}
        >
          <Box className={globalStyles.TaskListContainer}>
            {query.data?.data?.completedTasks &&
              query.data.data.uncompletedTasks && (
                <>
                  <TaskList tasks={query.data.data.uncompletedTasks} />
                  <DespegableTaskList
                    tasks={query.data.data.completedTasks}
                    title="Completed"
                    count={query.data.data.completedCount}
                    defaulOpenValue={true}
                  ></DespegableTaskList>
                </>
              )}
          </Box>

          {tasksCount > 0 ? null : (
            <TodoEmptyHelper
              title="Focus on your day"
              description="Get things done with My Day. A list that refreshes every day."
              photo={myDayImage}
            ></TodoEmptyHelper>
          )}
        </Box>
        <TaskInputForm pageQueryKey="MyDayTasks"></TaskInputForm>
      </div>
    </>
  );
}
