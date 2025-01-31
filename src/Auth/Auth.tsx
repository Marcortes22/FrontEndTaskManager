import LayoutSkeleton from '@/LayOut/LayoutSkeleton';
import { verifyAccound } from '@/Services/User/VerifyAccound';

import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export default function Auth({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const { isPending, error } = useQuery({
    queryKey: ['verifyAccount'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return await verifyAccound(token);
    },
    enabled: isAuthenticated,
  });

  if (isPending || isLoading) {
    return (
      <>
        <LayoutSkeleton></LayoutSkeleton>
      </>
    );
  }

  if (!isAuthenticated || error) {
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}
