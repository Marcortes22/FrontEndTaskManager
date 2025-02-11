import { darkTheme, lightTheme } from '@/Constants/Themes';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { backgroundImagesItems } from '@/Constants/BackGroundImages';
export function useLayOut() {
  const { mode } = useContext(ThemeContext);

  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const { backgroundIsChanging, backgroundImage, setBackgroundImages } =
    useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // Precargar todas las imágenes de fondo
    backgroundImagesItems.forEach((item) => {
      const img = new Image();
      img.src = item.img;
      console.log('img', img);
    });
    setBackgroundImages(backgroundImagesItems);
  }, [setBackgroundImages]);

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
  };
}
