import useBackGroundImageList from './Hook/useBackGroundImageList';
import { ImageList, ImageListItem, Box } from '@mui/material';

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
