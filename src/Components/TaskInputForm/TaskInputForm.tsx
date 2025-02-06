import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import styles from './styles/TaskInputForm.module.css';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { useTaskInputForm } from './Hook/useTaskImputForm';
import DateSelector from '../DateSelector/DateSelector';
import TaskListSelecterMenu from '../TaskListSelecterMenu/TaskListSelecterMenu';
import { TextField } from '@mui/material';

export default function TaskInputForm({
  defaultTaskListId,
  pageQueryKey,
}: {
  defaultTaskListId?: number;
  pageQueryKey: string;
}) {
  const {
    isFocused,
    setIsFocused,
    currentList,
    setCurrentList,
    dateValue,
    setDateValue,
    newTitleText,
    handleTextTitleChange,
    handleSubmit,
    mutation,
  } = useTaskInputForm(pageQueryKey, defaultTaskListId);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <div className={styles.buttonsAtTheEnd}>
          <TaskListSelecterMenu
            currentList={currentList}
            setCurrentList={setCurrentList}
            defaultTaskListId={defaultTaskListId}
          />

          <DateSelector value={dateValue} setValue={setDateValue} />
        </div>

        <IconButton type="submit" className={styles.buttonFormAddNewTask}>
          {isFocused ? (
            <CircleOutlinedIcon sx={{ color: 'white' }} />
          ) : (
            <AddIcon sx={{ color: 'white' }} />
          )}
        </IconButton>
        {/* <IconButton type="submit" className={styles.buttonFormAddNewTask}>
          </IconButton> */}
        {/* {inputRef.current?.value.trim().length > 0 ? ( */}
        {/* // ) : null} */}
        <TextField
          disabled={mutation.isPending}
          onChange={(e) => handleTextTitleChange(e)}
          onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          value={newTitleText}
          className={styles.newTaskInput}
          sx={{
            paddingRight: dateValue
              ? { xs: '123px', md: '167px' }
              : { xs: '74px', md: '103px' },
            position: 'absolute',
            paddingLeft: '30px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },

              '&:hover fieldset': {
                borderColor: 'transparent',
              },

              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
              '& .MuiInputBase-input': {
                color: 'white', // ✅ Forzar color blanco
              },
            },
          }}
          type="text"
          placeholder={
            isFocused
              ? `Try typing: 'Pay utilities bill by friday 6pm'`
              : 'Add a task'
          }
        ></TextField>
      </form>
    </>
  );
}
