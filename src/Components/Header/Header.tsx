import IconButton from '@mui/material/IconButton';
// import WallpaperRoundedIcon from '@mui/icons-material/WallpaperRounded';
// import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DehazeIcon from '@mui/icons-material/Dehaze';
import BackGroundList from '../BackGroundList/BackGroundList';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Box, Button, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './styles/Header.module.css';

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
      >
        <DehazeIcon />
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
            height: '275px',
            overflowY: 'scroll',
          }}
        >
          <Button
            sx={{
              color: theme.palette.text.primary,
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0px',
            }}
            variant="text"
            endIcon={<NavigateNextIcon />}
          >
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <SwapVertIcon />
              Sord by
            </Box>
          </Button>
          <BackGroundList></BackGroundList>
        </Box>
      </Menu>
    </header>
  );
}
