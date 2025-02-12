import IconButton from '@mui/material/IconButton';
import BackGroundImageList from '../BackGroundImageList/BackGroundImageList';
import Menu from '@mui/material/Menu';
import { Box } from '@mui/material';
import styles from './styles/Header.module.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { useHeader } from './Hook/useHeader';

export default function Header({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const { anchorEl, open, handleClick, handleClose, theme } = useHeader();

  return (
    <header className={styles.HeaderStyles}>
      <div>
        <h1>{title}</h1>
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
        <WallpaperIcon sx={{ color: theme.palette.primary.main }} />
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
