import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';

export default function BackDrop() {
  const { isLoading } = useContext(ThemeContext);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
