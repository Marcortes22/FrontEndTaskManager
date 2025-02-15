import { useUserMutation } from '@/Common/Mutations/useUserMutation';
import LayoutSkeleton from '@/LayOut/LayoutSkeleton';
import { GetPropertiesFromUserAuth0 } from '@/Utils/GetPropertiesFromUserAuth0';
import { useAuth0 } from '@auth0/auth0-react';

import { useEffect } from 'react';

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const { verifyAccountMutation } = useUserMutation();
  const { mutate } = verifyAccountMutation;

  useEffect(() => {
    if (!user) return;
    const userToValidate = GetPropertiesFromUserAuth0(user);
    if (isAuthenticated) {
      mutate(userToValidate);
    }
  }, [isAuthenticated, mutate, user]);

  if (isLoading) {
    return (
      <>
        <LayoutSkeleton></LayoutSkeleton>
      </>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}
