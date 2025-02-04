import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import ProfileButon from '@/Common/Buttons/ProfileButton/ProfileButon';
import LogoutButton from '@/Common/Buttons/LogoutButton/Logout.button';
import useSideBar from './Hooks/useSidebar';
import { Moon, Sun } from '@/Common';
import { useAuth0 } from '@auth0/auth0-react';

export default function SideBar({
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
    GoProfileRute,
    changeTheme,
    mode,
  } = useSideBar();
  const { user } = useAuth0();

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

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name} src={user?.picture} />
            </IconButton>
          </Tooltip>
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
            <Link className="linkReactRouter" to={`/Profile`}>
              <MenuItem onClick={GoProfileRute}>
                <ProfileButon text="Profile" />
              </MenuItem>
            </Link>
            <MenuItem>
              <LogoutButton text="LogOut"></LogoutButton>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </>
  );
}
