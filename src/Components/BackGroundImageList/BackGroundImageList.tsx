import { Box, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import thumbnail_1 from '@/assets/thumbnails/city-thumbnail .webp';
import background_1 from '@/assets/backgroundImages/city-background.webp';

import thumbnail_2 from '@/assets/thumbnails/dark-forest-thumbnail .webp';
import background_2 from '@/assets/backgroundImages/dark-forest-background.webp';

import thumbnail_3 from '@/assets/thumbnails/forest-thumbnail.webp';
import background_3 from '@/assets/backgroundImages/forest-background.webp';

import thumbnail_4 from '@/assets/thumbnails/glasses-thumbnail.webp';
import background_4 from '@/assets/backgroundImages/glasses-background.webp';

import thumbnail_5 from '@/assets/thumbnails/hill-thumbnail.webp';
import background_5 from '@/assets/backgroundImages/hill-background.webp';

import thumbnail_6 from '@/assets/thumbnails/sunset-thumbnail.webp';
import background_6 from '@/assets/backgroundImages/sunset-background.webp';

import thumbnail_7 from '@/assets/thumbnails/mountain-thumbnail.webp';
import background_7 from '@/assets/backgroundImages/mountain-background.webp';

import thumbnail_8 from '@/assets/thumbnails/rock-thumbnail.webp';
import background_8 from '@/assets/backgroundImages/rock-background.webp';

import thumbnail_9 from '@/assets/thumbnails/sea-thumbnail.webp';
import background_9 from '@/assets/backgroundImages/sea-background.webp';

import thumbnail_10 from '@/assets/thumbnails/sea-star-thumbnail.webp';
import background_10 from '@/assets/backgroundImages/sea-star-background.webp';

import thumbnail_11 from '@/assets/thumbnails/snow-mountain-thumbnail.webp';
import background_11 from '@/assets/backgroundImages/snow-mountain-background.webp';

import thumbnail_12 from '@/assets/thumbnails/stars-thumbnail.webp';
import background_12 from '@/assets/backgroundImages/stars-background.webp';

import { useContext } from 'react';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';

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
        {itemData.map((item) => (
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

const itemData = [
  {
    thumbnail: thumbnail_1,
    img: background_1,
    title: 'city background',
  },
  {
    thumbnail: thumbnail_2,
    img: background_2,
    title: 'Dark forest background',
  },
  {
    thumbnail: thumbnail_3,
    img: background_3,
    title: 'Forest background',
  },
  {
    thumbnail: thumbnail_4,
    img: background_4,
    title: 'Glasses background',
  },
  {
    thumbnail: thumbnail_5,
    img: background_5,
    title: 'Hill background',
  },
  {
    thumbnail: thumbnail_6,
    img: background_6,
    title: 'Mars background',
  },
  {
    thumbnail: thumbnail_7,
    img: background_7,
    title: 'Mountain background',
  },
  {
    thumbnail: thumbnail_8,
    img: background_8,
    title: 'Rock background',
  },
  {
    thumbnail: thumbnail_9,
    img: background_9,
    title: 'Sea background',
  },
  {
    thumbnail: thumbnail_10,
    img: background_10,
    title: 'Star background',
  },
  {
    thumbnail: thumbnail_11,
    img: background_11,
    title: 'Snow mountain background',
  },
  {
    thumbnail: thumbnail_12,
    img: background_12,
    title: 'Stars background',
  },
];
