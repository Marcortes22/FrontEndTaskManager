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
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    error: authError,
  } = useAuth0();
  const { verifyAccountMutation } = useUserMutation();
  const { mutate, error: fetchError } = verifyAccountMutation;

  useEffect(() => {
    console.log('useEffect');
    if (!user) {
      return;
    }
    const userToValidate = GetPropertiesFromUserAuth0(user);

    if (!userToValidate.id || !userToValidate.provider) {
      setTimeout(() => {
        toast.error('Something went wrong in your login, please try again');
      }, 1500);
      loginWithRedirect();
    }
    if (isAuthenticated) {
      mutate(userToValidate);
    }
  }, [isAuthenticated, loginWithRedirect, mutate, user]);

  if (isLoading) {
    return <LayoutSkeleton></LayoutSkeleton>;
  }

  if (!isAuthenticated || fetchError || authError) {
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}
