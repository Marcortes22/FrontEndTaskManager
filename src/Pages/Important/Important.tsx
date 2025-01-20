import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/Important.module.css';
import Header from '@/Components/Header/Header';
import { tasksTest } from '@/Constants/tasks';
import TaskList from '@/Components/TaskList/TaskList';
import TodoEmptyHelper from '@/Components/TodoEmptyHelper/TodoEmptyHelper';
import importantPhoto from '@/assets/calendario.png';
import TaskInputForm from '@/Components/TaskInputForm/TaskInputForm';

export default function Important() {
  const { isAuthenticated } = useAuth0();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const importantTasks = tasksTest?.filter((item) => item.isImportant === true);

  return (
    <>
      {isAuthenticated && (
        <div className={styles.importantContainer}>
          <Header title="Important"></Header>

          <main className={styles.importantMain}>
            <TaskList tasks={importantTasks} />

            {importantTasks?.length > 0 ? null : (
              <TodoEmptyHelper
                title="Wondering where your tasks are?"
                description="Any tasks you didn't complete in My Day last time show up in the suggestions pane."
                photo={importantPhoto}
              ></TodoEmptyHelper>
            )}

            <TaskInputForm handleSubmit={handleSubmit}></TaskInputForm>
          </main>
        </div>
      )}
    </>
  );
}
