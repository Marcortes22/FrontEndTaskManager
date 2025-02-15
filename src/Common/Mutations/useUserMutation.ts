import { verifyAccound } from '@/Services/User/VerifyAccound';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateUserDto } from '@/Interfaces/Users/IUser';
import { useAuth0 } from '@auth0/auth0-react';

export function useUserMutation() {
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
    },
  });

  return { verifyAccountMutation };
}
