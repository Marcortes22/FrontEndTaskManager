import { Box, IconButton, Menu, Tooltip, Typography } from '@mui/material';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import styles from './styles/DateSelecter.module.css';
import { useDateSelecter } from './Hook/useDateSelecter';
import { DateCalendar } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
export default function DateSelecter({
  value,
  setValue,
}: {
  value: Dayjs | null;
  setValue: (value: Dayjs | null) => void;
}) {
  const { anchorEl, open, handleClick, handleClose } = useDateSelecter();
  return (
    <>
      <Tooltip title="Add due date" arrow>
        <Box
          sx={{
            zIndex: 2,
            paddingRight: '5px',
          }}
        >
          <IconButton
            sx={{
              color: 'white',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '2px',
              borderRadius: '2px',
              paddingX: '2px',
            }}
            className={styles.dateSelecterButton}
            aria-controls={open ? 'dateSelector' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <CalendarMonthOutlinedIcon sx={{ fontSize: '20px' }} />
            <Typography variant="body2" sx={{ color: 'white' }}>
              {value ? value.format('M/D/YYYY') : null}
            </Typography>
          </IconButton>
        </Box>
      </Tooltip>

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
// sx={{ color: 'white' }}
