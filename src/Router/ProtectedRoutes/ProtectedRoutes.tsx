import { useUserMutation } from '@/Common/Mutations/useUserMutation';
import LayoutSkeleton from '@/LayOut/LayoutSkeleton';
import { GetPropertiesFromUserAuth0 } from '@/Utils/GetPropertiesFromUserAuth0';
import { useAuth0 } from '@auth0/auth0-react';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const { verifyAccountMutation } = useUserMutation();
  const { mutate, error } = verifyAccountMutation;

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

  if (!isAuthenticated || error || !user?.sub) {
    setTimeout(() => {
      toast.error('Something wrong with your login, try again', {});
    }, 1000);
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}
