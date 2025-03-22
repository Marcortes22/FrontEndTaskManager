import { useUserMutation } from '@/Common/Mutations/useUserMutation';
import LayoutSkeleton from '@/LayOut/LayoutSkeleton';
import { GetPropertiesFromUserAuth0 } from '@/Utils/GetPropertiesFromUserAuth0';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
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
  const [isVerified, setIsVerified] = useState(false);
  const { verifyAccountMutation } = useUserMutation(setIsVerified);
  const { mutateAsync, error: fetchError } = verifyAccountMutation;

  useEffect(() => {
    if (!user) {
      setIsVerified(false);
      return;
    }

    const userToValidate = GetPropertiesFromUserAuth0(user);

    if (!userToValidate.id || !userToValidate.provider) {
      setTimeout(() => {
        toast.error('Something went wrong in your login, please try again');
      }, 1500);
      loginWithRedirect();
      return;
    }

    if (isAuthenticated) {
      mutateAsync(userToValidate);
    }
  }, [isAuthenticated, loginWithRedirect, mutateAsync, user]);

  if (isLoading) {
    return <LayoutSkeleton />;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  if (!isVerified) {
    return <LayoutSkeleton />;
  }

  if (fetchError || authError) {
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}
