import { darkTheme, lightTheme } from '@/Constants/Themes';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
export function useLayOut() {
  const { mode } = useContext(ThemeContext);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const { backgroundIsChanging, backgroundImage } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [createTaskListDialogOpen, setCreateTaskListDialogOpen] =
    useState(false);

  function handleCreateTaskListDialogClose() {
    setCreateTaskListDialogOpen(false);
  }
  function handleCreateTaskListDialogOpen() {
    setCreateTaskListDialogOpen(true);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   // Precargar todas las imágenes de fondo
  //   backgroundImagesItems.forEach((item) => {
  //     const img = new Image();
  //     img.src = item.img;
  //   });
  //   setBackgroundImages(backgroundImagesItems);
  // }, [setBackgroundImages]);

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
    backgroundIsChanging,
    createTaskListDialogOpen,
    handleCreateTaskListDialogClose,
    handleCreateTaskListDialogOpen,
  };
}
