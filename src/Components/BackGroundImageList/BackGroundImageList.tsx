import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useBackGroundImageList from './Hook/useBackGroundImageList';

export default function BackGroundImageList({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { backgroundImages, isMobile, handleChangesBackgroundImage } =
    useBackGroundImageList();
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
