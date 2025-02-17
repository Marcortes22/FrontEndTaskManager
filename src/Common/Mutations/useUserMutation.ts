import { verifyAccound } from '@/Services/User/VerifyAccound';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateUserDto } from '@/Interfaces/Users/IUser';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import background from '@/assets/backgroundImages/dark-forest-background.webp';
import { updateUser, updateUserType } from '@/Services/User/UpdateUser';

export function useUserMutation() {
  const { setBackgroundImage, backgroundImages } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const verifyAccountMutation = useMutation({
    mutationFn: async (userData: ICreateUserDto) => {
      const token = await getAccessTokenSilently();
      // console.log(token);
      return verifyAccound(token, userData);
    },
    onSuccess: (data) => {
      if (data.data?.isNewUser) {
        queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      }
      const userBackGround = backgroundImages.find(
        (item) => item.img.split('/').pop() === data.data?.backGroundImage,
      )?.img;
      setBackgroundImage(userBackGround ? userBackGround : background);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (userData: updateUserType) => {
      const token = await getAccessTokenSilently();
      return updateUser({ token, userData });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { verifyAccountMutation, updateUserMutation };
}
