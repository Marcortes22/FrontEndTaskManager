import { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { useDetailDateSelector } from './Hook/useDetailDateSelector';
import { Button, Menu, Typography } from '@mui/material';
import { CalendarMonthOutlinedIcon } from '@Icons/Icons';

export default function DetailDateSelector({
  value,
  setValue,
}: {
  value: Dayjs | null;
  setValue: (value: Dayjs | null) => void;
}) {
  const { anchorEl, open, handleClick, handleClose } = useDetailDateSelector();

  return (
    <>
      <Button
        aria-controls={open ? 'dateSelector' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<CalendarMonthOutlinedIcon sx={{ fontSize: '20px' }} />}
      >
        <Typography variant="body1">
          {value ? `Due: ${value.format('M/D/YYYY')}` : 'Add due date'}
        </Typography>
      </Button>

      <Menu
        id="dateSelector"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <DateCalendar
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleClose();
          }}
        />
      </Menu>
    </>
  );
}
