import BasicAlert from '@mui/material/Alert';
import { AlertProps } from './Alert.types';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { Box, Snackbar } from '@mui/material';

export default function Alert(alertProps: AlertProps) {
  const [open, setOpen] = useState(true);
  //aplicar css modules en sx
  return (
    <>
      {/* <Slide direction="up" in={open} mountOnEnter unmountOnExit> */}
      <Snackbar
        open={open}
        autoHideDuration={alertProps?.duration || 3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ width: '100%' }}>
          <BasicAlert
            icon={alertProps?.icon}
            severity={alertProps?.severity}
            variant={alertProps?.variant}
            color={alertProps?.color}
            onClose={() => {
              setOpen(false);
            }}
          >
            {alertProps?.title ? (
              <AlertTitle>{alertProps?.title}</AlertTitle>
            ) : null}
            {alertProps?.message}
          </BasicAlert>
        </Box>
      </Snackbar>
      {/* </Slide> */}
    </>
  );
}
