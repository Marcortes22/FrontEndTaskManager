import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';

import { useEffect } from 'react';

export function useAuthToken() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const saveTokenToCookies = async () => {
      const existingToken = Cookies.get('auth_token');

      if (!existingToken) {
        try {
          const token = await getAccessTokenSilently();
          Cookies.set('auth_token', token, {
            secure: true,
            sameSite: 'strict',
          });
        } catch (error) {
          console.error('Error al obtener el token: ', error);
        }
      }
    };

    saveTokenToCookies();
  }, [isAuthenticated, getAccessTokenSilently]);
}
