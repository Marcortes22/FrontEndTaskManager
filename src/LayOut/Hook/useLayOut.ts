import { darkTheme, lightTheme } from '@/Constants/Themes';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';

export function useLayOut() {
  const { mode } = useContext(ThemeContext);
  const { backgroundImage } = useContext(ThemeContext);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isDeskTop = useMediaQuery(theme.breakpoints.up('sm'));

  return {
    backgroundImage,
    handleDrawerClose,
    handleDrawerOpen,
    isDeskTop,
    open,
    theme,
  };
}
