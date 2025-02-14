import { IconButton, TextField } from '@mui/material';
import { CircleOutlinedIcon } from '@Icons/Icons';
import { useTaskInputForm } from './Hook/useTaskImputForm';
import { DateSelector } from '@Components/index';
import styles from './styles/TaskInputForm.module.css';
import TaskListSelector from '../TaskListSelector/TaskListSelectorMenu';
import AddIcon from '@mui/icons-material/Add';

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
  } = useTaskInputForm(pageQueryKey);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <div className={styles.buttonsAtTheEnd}>
          <TaskListSelector
            currentList={currentList}
            setCurrentList={setCurrentList}
            defaultTaskListId={defaultTaskListId}
          />

          <DateSelector value={dateValue} setValue={setDateValue} />
        </div>

        <IconButton type="submit" className={styles.buttonFormAddNewTask}>
          {newTitleText.trim().length > 0 ? (
            <CircleOutlinedIcon sx={{ color: 'white' }} />
          ) : (
            <AddIcon sx={{ color: 'white' }} />
          )}
        </IconButton>

        <TextField
          // disabled={mutation.isPending}
          onChange={(e) => handleTextTitleChange(e)}
          onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}

          value={newTitleText}
          className={styles.newTaskInput}
          sx={{
            paddingRight: dateValue
              ? { xs: '94px', sm: '110dpx', md: '167px' }
              : { xs: '69px', sm: '74' },
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
                color: 'white',
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
