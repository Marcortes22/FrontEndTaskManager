import { ThemeContext } from '@/Contexts/index';
import { useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';

export default function useBackGroundImageList() {
  const { setBackgroundImage, setBackgroundIsChanging, backgroundImages } =
    useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleChangesBackgroundImage(img: string) {
    setBackgroundIsChanging(true);

    setTimeout(() => {
      setBackgroundImage(img);
    }, 300);
    setTimeout(() => {
      setBackgroundIsChanging(false);
    }, 350);
  }

  return {
    backgroundImages,
    isMobile,
    handleChangesBackgroundImage,
  };
}
