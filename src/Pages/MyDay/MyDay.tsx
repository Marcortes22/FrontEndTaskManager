import { useAuth0 } from '@auth0/auth0-react';
import { format } from '@formkit/tempo';
import styles from './styles/MyDay.module.css';
import calendarPhoto from '@/assets/calendar.png';
import Header from '@/Components/Header/Header';
import { tasksTest } from '@/Constants/tasks';
import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import { getTodayTasks } from '@/Utils/Funtions';

export default function MyDay() {
  const { isAuthenticated } = useAuth0();

  const date = new Date();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const todayTasks = getTodayTasks(tasksTest);

  //console.log(todayTasks);

  return (
    isAuthenticated && (
      <>
        <div className={styles.myDayContainer}>
          <Header
            title="My Day"
            children={<p>{format(date, 'full')}</p>}
          ></Header>

          <main className={styles.myDayMain}>
            <TaskList tasks={todayTasks} />

            {todayTasks?.length > 0 ? null : (
              <TodoEmptyHelper
                title="Focus on your day"
                description="Get things done with My Day. A list that refreshes every day."
                photo={calendarPhoto}
              ></TodoEmptyHelper>
            )}

            <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
          </main>
        </div>
      </>
    )
  );
}
