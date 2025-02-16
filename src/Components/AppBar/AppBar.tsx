import { Logout as LogoutButton, Moon, Sun } from '@/Common/index';
import { MenuIcon } from '@Icons/Icons';
import useAppBar from './Hooks/useAppBar';
import {
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

export default function AppBar({
  open,
  handleDrawerOpen,
}: {
  open: boolean;
  handleDrawerOpen: () => void;
}) {
  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    changeTheme,
    mode,
    user,
  } = useAppBar();

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '64px',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton aria-label="Mode" onClick={changeTheme}>
              {mode === 'dark' ? <Sun /> : <Moon />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField label="Search" variant="standard" />
        </Box> */}

        <Box
          sx={{
            flexGrow: 0,
            display: 'flex',
            alignItems: 'end',
            gap: '5px',
            flexDirection: 'column',
            justifyContent: 'end',
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name} src={user?.picture} />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" sx={{ color: 'white' }}>
            {user?.email}
          </Typography>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <LogoutButton text="LogOut"></LogoutButton>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </>
  );
}
