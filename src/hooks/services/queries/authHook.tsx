import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../QueryKey';
import axios from 'axios';

export const useGetAccessTokenByRefresh = () => {
  // TODO Error 처리 및 옵션 재설정
  const renewAccessTokenResponse = useQuery({
    queryKey: [QueryKey.REFRESH],
    queryFn: () => {
      return axios.get(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/renew-access-token',
        {
          withCredentials: true,
        }
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    refetchInterval: 60 * 50 * 1000, // 1시간 인 상황
    refetchIntervalInBackground: true,
  });

  return { accessToken: renewAccessTokenResponse.data?.data.accessToken };
};

export const useGetMemberByAccessToken = (accessToken: string) => {
  const response = useQuery({
    queryKey: [QueryKey.MEMBER],
    queryFn: () => {
      return axios.get('/user-service/api/v1/member/info', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    enabled: !!accessToken,
  });

  return { memberInfo: response.data?.data.data };
};

export const useGetMemberInfo = () => {
  const { accessToken } = useGetAccessTokenByRefresh();

  const { memberInfo } = useGetMemberByAccessToken(accessToken);

  return { accessToken: accessToken, memberInfo };
};
