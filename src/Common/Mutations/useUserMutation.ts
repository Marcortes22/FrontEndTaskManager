import { verifyAccound } from '@/Services/User/VerifyAccound';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

export function useUserMutation() {
  const { getAccessTokenSilently } = useAuth0();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const queryClient = useQueryClient();

  const verifyAccountMutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently();
      //console.log(token);
      return verifyAccound(token, timeZone);
    },
    onSuccess: (data) => {
      if (data.data?.isNewUser) {
        queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      }
    },
  });

  return { verifyAccountMutation };
}
