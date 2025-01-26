import ThemeContextProvider from '@/Contexts/ThemeContextProvider';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        //useRefreshTokens: true,
      }}
    >
      <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeContextProvider>
    </Auth0Provider>
  );
}
