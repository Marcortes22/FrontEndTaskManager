import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useState } from 'react';

export default function useAppBar() {
  const { mode, setMode } = useContext(ThemeContext);
  const { logout, user } = useAuth0();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  function changeTheme() {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }

  return {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    changeTheme,
    handleLogOut,
    mode,
    user,
  };
}
