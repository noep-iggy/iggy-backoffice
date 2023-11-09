import router from 'next/router';
import { ReactNode, useEffect } from 'react';
import { Loader } from '@/components';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/routing';

interface AuthWallProps {
  children?: ReactNode;
}

export function AuthWall(props: AuthWallProps): React.JSX.Element {
  const { children } = props;

  const { isAuthenticated, removeToken, token } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated()) {
      removeToken();
      router.push(ROUTES.auth.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return isAuthenticated() ? <>{children}</> : <Loader />;
}
