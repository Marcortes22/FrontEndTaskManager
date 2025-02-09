import { useUserMutation } from '@/Common/Mutations/useUserMutation';
import LayoutSkeleton from '@/LayOut/LayoutSkeleton';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { verifyAccountMutation } = useUserMutation();
  const { mutate, error } = verifyAccountMutation;

  useEffect(() => {
    if (isAuthenticated) {
      mutate();
    }
  }, [isAuthenticated, mutate]);

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
