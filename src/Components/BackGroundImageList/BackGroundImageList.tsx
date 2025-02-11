import { Box, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useContext } from 'react';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { backgroundImagesItems } from '@/Constants/BackGroundImages';

export default function BackGroundImageList() {
  const { setBackgroundImage } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        {backgroundImagesItems.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{
              cursor: 'pointer',
            }}
          >
            <img
              style={{ width: '65px', height: '50px', borderRadius: '5px' }}
              srcSet={`${item.thumbnail}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.thumbnail}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              // loading="lazy"
              onClick={() => setBackgroundImage(item.img)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
