import { useAuth0 } from '@auth0/auth0-react';
import LogoutIcon from '@mui/icons-material/Logout';
import BasicButton from '@mui/material/Button';

interface LogoutButtonProps {
  text: string;
}

export default function LogoutButton(props: LogoutButtonProps) {
  const { logout } = useAuth0();

  return (
    <BasicButton
      startIcon={<LogoutIcon />}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      variant={'outlined'}
      color={'error'}
      size={'medium'}
    >
      {props.text}
    </BasicButton>
  );
}
