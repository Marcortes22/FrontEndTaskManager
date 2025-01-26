import LayoutSkeleton from '@/LayOut/LayoutSkeleton';
import { useAuth0 } from '@auth0/auth0-react';

export default function Auth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

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
