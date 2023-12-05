import { useContext } from 'react';
import { AuthContext } from '../../pages/Root';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useAuth() {
  return useContext(AuthContext);
}

export function UseGetAccessTokenByRefreshToken({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}) {
  const getAccessTokenMutation = useMutation({
    mutationFn: () => {
      return axios.post(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/renew-access-token',
        null,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(response: any) {
      setAuth(response.data.accessToken);
    },
    onError(error) {
      console.log(error);
    },
  });

  return { getAccessTokenMutation };
}
