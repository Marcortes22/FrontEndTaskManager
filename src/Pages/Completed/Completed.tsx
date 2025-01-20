import { useAuth0 } from '@auth0/auth0-react';
import { tasksTest } from '@/Constants/tasks';
import styles from './styles/Completed.module.css';
import Header from '@/Components/Header/Header';
import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import completedPhoto from '@/assets/icons8-completed-64.png';

export default function Completed() {
  const { isAuthenticated } = useAuth0();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const completedTasks = tasksTest?.filter((item) => item.isCompleted === true);

  return (
    <>
      {isAuthenticated && (
        <div className={styles.completedContainer}>
          <Header title="Planned"></Header>

          <main className={styles.completedtMain}>
            <TaskList tasks={completedTasks} />

            {completedTasks?.length > 0 ? null : (
              <TodoEmptyHelper
                title=""
                description="Tasks with due dates will show up here."
                photo={completedPhoto}
              ></TodoEmptyHelper>
            )}

            <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
          </main>
        </div>
      )}
    </>
  );
}
