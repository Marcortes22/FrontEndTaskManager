import { verifyAccound } from '@/Services/User/VerifyAccound';
import { useMutation } from '@tanstack/react-query';
import { ICreateUserDto } from '@/Interfaces/Users/IUser';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import background from '@/assets/backgroundImages/dark-forest-background.webp';
import { updateUser, updateUserType } from '@/Services/User/UpdateUser';

export function useUserMutation(setIsVerified: (value: boolean) => void) {
  const { setBackgroundImage, backgroundImages } = useContext(ThemeContext);

  const { getAccessTokenSilently } = useAuth0();

  const verifyAccountMutation = useMutation({
    mutationFn: async (userData: ICreateUserDto) => {
      const token = await getAccessTokenSilently();
      return verifyAccound(token, userData);
    },
    onSuccess: (data) => {
      const userBackGround = backgroundImages.find(
        (item) => item.img.split('/').pop() === data.data?.backGroundImage,
      )?.img;
      setBackgroundImage(userBackGround ? userBackGround : background);
    },
    onSettled: () => {
      setIsVerified(true);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (userData: updateUserType) => {
      const token = await getAccessTokenSilently();
      return updateUser({ token, userData });
    },
  });

  return { verifyAccountMutation, updateUserMutation };
}
