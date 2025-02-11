import IconButton from '@mui/material/IconButton';
import BackGroundImageList from '../BackGroundImageList/BackGroundImageList';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import { Box, useTheme } from '@mui/material';
import styles from './styles/Header.module.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

export default function Header({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

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
