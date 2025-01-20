import { useAuth0 } from '@auth0/auth0-react';
import { tasksTest } from '@/Constants/tasks';
import styles from './styles/Planned.module.css';
import Header from '@/Components/Header/Header';
import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';
import plannedPhoto from '@/assets/time-and-calendar.png';

export default function Planned() {
  const { isAuthenticated } = useAuth0();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const importantTasks = tasksTest?.filter((item) => item.dueDate !== null);

  return (
    <>
      {isAuthenticated && (
        <div className={styles.plannedContainer}>
          <Header title="Planned"></Header>

          <main className={styles.plannedtMain}>
            <TaskList tasks={importantTasks} />

            {importantTasks?.length > 0 ? null : (
              <TodoEmptyHelper
                title=""
                description="Tasks with due dates will show up here."
                photo={plannedPhoto}
              ></TodoEmptyHelper>
            )}

            <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
          </main>
        </div>
      )}
    </>
  );
}
