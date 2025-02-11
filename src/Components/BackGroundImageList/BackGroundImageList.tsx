import { Box, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useContext } from 'react';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';

export default function BackGroundImageList({
  handleClose,
}: {
  handleClose: () => void;
}) {
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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <p>Theme</p>
      <ImageList
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        cols={isMobile ? 3 : 4}
        gap={10}
      >
        {backgroundImages.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{
              cursor: 'pointer',
            }}
          >
            <img
              style={{ width: '65px', height: '50px', borderRadius: '5px' }}
              srcSet={`${item.thumbnail}`}
              src={`${item.thumbnail}`}
              alt={item.title}
              // loading="lazy"
              onClick={() => {
                handleChangesBackgroundImage(item.img);
                handleClose();
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
