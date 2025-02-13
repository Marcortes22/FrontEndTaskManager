import { Box, Menu, IconButton, Typography } from '@mui/material';
import styles from './styles/Header.module.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { useHeader } from './Hook/useHeader';
import { BackGroundImageList } from '@Components/index';

export default function Header({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
  isRemovableList?: boolean;
}) {
  const { anchorEl, open, handleClick, handleClose } = useHeader();

  return (
    <header className={styles.HeaderStyles}>
      <div>
        <Typography
          sx={{
            flexGrow: 1,
            maxWidth: '75dvw',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          variant="h4"
        >
          {title}
        </Typography>
        {children}
      </div>
      <IconButton
        sx={{ color: 'white' }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
      >
        <WallpaperIcon sx={{ color: '#42a5f5' }} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box className={styles.MenuContainer}>
          <BackGroundImageList handleClose={handleClose} />
        </Box>
      </Menu>
    </header>
  );
}
