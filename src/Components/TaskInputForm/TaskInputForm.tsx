import IconButton from '@mui/material/IconButton';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Tooltip } from '@mui/material';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles/TaskInputForm.module.css';
import { useRef, useState } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export default function TaskInputForm({
  handleSubmit,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        {isFocused ? (
          <IconButton type="submit" className={styles.buttonFormAddNewTask}>
            <CircleOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton type="submit" className={styles.buttonFormAddNewTask}>
            <AddIcon />
          </IconButton>
        )}

        <div className={styles.buttonsAtTheEnd}>
          <Tooltip title="Add due date">
            <IconButton className={styles.buttonFormAddNewTask}>
              <CalendarMonthOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Remind me">
            <IconButton className={styles.buttonFormAddNewTask}>
              <AccessAlarmOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>

        <input
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.newTaskInput}
          type="text"
          placeholder={
            isFocused
              ? `Try typing: 'Pay utilities bill by friday 6pm'`
              : 'Add a task'
          }
        ></input>
      </form>
    </>
  );
}
