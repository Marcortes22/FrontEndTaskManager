import BasicButton from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
interface ProfileButtonProps {
  text: string;
}
export default function ProfileButton(props: ProfileButtonProps) {
  return (
    <BasicButton
      startIcon={<AccountBoxIcon />}
      variant={'outlined'}
      color={'success'}
      size={'medium'}
    >
      {props.text}
    </BasicButton>
  );
}
