import { useUserMutation } from '@/Common/Mutations/useUserMutation';
import { ThemeContext } from '@/Contexts/index';
import { useMediaQuery, useTheme } from '@mui/material';
import { useContext, useState } from 'react';

export default function useBackGroundImageList() {
  const { setBackgroundImage, setBackgroundIsChanging, backgroundImages } =
    useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isVerified, setIsVerified] = useState(false);
  const { updateUserMutation } = useUserMutation(setIsVerified);

  async function handleChangesBackgroundImage(img: string) {
    if (!img) return;
    setBackgroundIsChanging(true);

    setTimeout(() => {
      setBackgroundImage(img);
    }, 300);
    setTimeout(() => {
      setBackgroundIsChanging(false);
    }, 350);

    updateUserMutation.mutate({
      newBackGroundImage: img.split('/').pop() || '',
    });
  }

  return {
    backgroundImages,
    isMobile,
    handleChangesBackgroundImage,
    isVerified,
  };
}
